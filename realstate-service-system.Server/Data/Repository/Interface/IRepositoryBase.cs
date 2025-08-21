using System.Linq.Expressions;
namespace realstate_service_system.Server.Data.Repository.Interface
{
        public interface IRepositoryBase<T> where T : class
        {
            Task<IEnumerable<T>> GetAllAsync();
            Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression);
            Task<T?> GetByIdAsync(Guid id);
            Task<T> CreateAsync(T entity);
            Task UpdateAsync(T entity);
            Task DeleteAsync(T entity);
            Task<bool> ExistsAsync(Expression<Func<T, bool>> expression);
            Task<int> CountAsync(Expression<Func<T, bool>> expression = null);
            Task SaveAsync();
        }
    
}
