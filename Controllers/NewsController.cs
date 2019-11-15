using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bilect.DAL.Dtos;
using Bilect.DAL.HelperModels;
using Bilect.Services.Interfaces;
using Bilect.Services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bilect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpPost, Route("AddNews")]
        public IActionResult AddNews(AddNewsDto addNewsDto)
        {
            OperationResult operationResult = _newsService.AddNews(addNewsDto);
            return Ok(operationResult);
        }
    }
}