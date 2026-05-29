using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<IReadOnlyList<T>> GetAllAsync(CancellationToken cancellationToken);
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<T>> GetAllAsync(ISpecification<T> specification, CancellationToken cancellationToken);
    Task<T?> GetByIdAsync(ISpecification<T> specification, CancellationToken cancellationToken);
    Task<IReadOnlyList<TResult>> GetAllAsync<TResult>(ISpecification<T, TResult> specification, CancellationToken cancellationToken);
    //Task<TResult?> GetByIdAsync<TResult>(ISpecification<T, TResult> specification, CancellationToken cancellationToken);
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    bool IsExists(Guid id);

    Task<int> CountAsync(ISpecification<T> specification, CancellationToken cancellationToken);

}
