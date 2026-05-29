using System.Collections.Concurrent;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data.Repositories;

namespace Infrastructure.Data;

public class UnitOfWork(StoreDbContext storeDbContext) : IUnitOfWork
{
    private readonly StoreDbContext _dbContext = storeDbContext;

    private readonly ConcurrentDictionary<string, object> _repositories = new();
    public void Dispose()
    {
        _dbContext.Dispose();
    }

    public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
    {
        var repoType = typeof(TEntity).Name;

        return (IGenericRepository<TEntity>)_repositories.GetOrAdd(repoType, t =>
        {
            var repo = typeof(GenericRepository<>).MakeGenericType(typeof(TEntity));
            return Activator.CreateInstance(repo, _dbContext) ?? throw new InvalidOperationException($"Can't Create repository {t}");

        });
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _dbContext.SaveChangesAsync() > 0;
    }
}
