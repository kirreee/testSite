using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bilect.DAL.Dtos;
using Bilect.DAL.HelperModels;
using Bilect.DAL.ViewModels;
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
        
        [HttpGet, Route("GetAllNews")]
        public IActionResult GetAllNews()
        {
            List<NewsViewModel> viewModel = _newsService.GetAllNews();
            return Ok(viewModel);
        }

        [HttpPost, Route("AddNews")]
        public IActionResult AddNews(AddNewsDto addNewsDto)
        {
            OperationResult operationResult = _newsService.AddNews(addNewsDto);
            return Ok(operationResult);
        }

        [HttpGet, Route("GetNewsById/{newsId}")]
        public IActionResult GetNewsById(int newsId)
        {
            NewsViewModel newsViewModel = _newsService.GetNewsById(newsId);
            return Ok(newsViewModel);
        }

        [HttpPost, Route("UpdateNews/{newsId}")]
        public IActionResult UpdateNews(int newsId, AddNewsDto addNewsDto)
        {
            OperationResult operationResult = _newsService.UpdateNews(newsId, addNewsDto);
            return Ok(operationResult);
        }

        [HttpDelete, Route("DeleteNews/{newsId}")]
        public IActionResult GetAllNews(int newsId)
        {
            OperationResult operationResult = _newsService.RemoveNews(newsId);
            return Ok(operationResult);
        }
    }
}