using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace aspnetcoreapp
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private Dictionary<Guid, Todo> todoRepository;

        public TodoController(Dictionary<Guid, Todo> todoRepository)
        {
            this.todoRepository = todoRepository;
        }

        [HttpGet]
        public ObjectResult Get([FromHeader]Guid id)
        {
            if(id != Guid.Empty)
            {
                 return new ObjectResult(this.todoRepository[id]);
            }

            return new ObjectResult(this.todoRepository.Values.ToList());
        }

        [HttpPost]
        public ObjectResult Post([FromBody]Todo item)
        {
            item.Id = Guid.NewGuid();
            todoRepository.Add(item.Id, item);
            return CreatedAtRoute(new { id = item.Id }, item);
        }

        [HttpPut]
        public StatusCodeResult Put([FromBody]Todo item, [FromHeader]Guid id)
        {
            todoRepository[id].Name = item.Name;
            todoRepository[id].IsComplete = item.IsComplete;

            return this.NoContent();
        }

        [HttpDelete]
        public StatusCodeResult Delete([FromHeader]Guid id)
        {
            todoRepository.Remove(id);
            return this.Ok();
        }
    }
}