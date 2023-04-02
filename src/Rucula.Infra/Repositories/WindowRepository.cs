using Microsoft.EntityFrameworkCore;
using Rucula.Domain.Window;

public class WindowRepository : UnitOfWork , IWindowRepository
{
    public WindowRepository(ApplicationContext context) : base(context){}
    public async Task<Window> GetCompleteAsync(string id)
    {
            return await  this._context.Window!
            .Include(c => c.Frames)
            .ThenInclude( c => c.Fields)
            .FirstAsync(c => c.Id == id); 
    }
}