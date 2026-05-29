using Core.Entities;

namespace Core.Interfaces;

public interface IUnitOfWork : IDisposable
{
    Task<bool> SaveChangesAsync();
    IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
}
