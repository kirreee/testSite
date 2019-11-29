using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bilect.DAL.Dtos;
using Bilect.DAL.HelperModels;
using Bilect.DAL.ViewModels;
using Bilect.Services.Helpers;
using Bilect.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Bilect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        
        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet, Route("GetEnums")]
        public IActionResult GetEnums()
        {
            EnumViewModel enumViewModel = new EnumViewModel()
            {
                CarTypes = EnumHelper.GetCarTypes(),
                FuelTypes = EnumHelper.GetFuelTypes(),
                GearboxTypes = EnumHelper.GetGearboxTypes()
            };

            return Ok(enumViewModel);
        }

        [HttpGet, Route("GetArticles")]
        public IActionResult GetArticles()
        {
            List<ArticleViewModel> articlesViewModel = _articleService.GetArticles();
            return Ok(articlesViewModel);
        }

        [HttpPost, Route("AddArticle")]
        public IActionResult AddArticle(AddArticleDto addArticleDto)
        {
            OperationResult operationResult = _articleService.AddArticle(addArticleDto);
            return Ok(operationResult);
        }
        
        [HttpGet, Route("GetMyArticles")]
        public IActionResult GetMyArticles()
        {
            List<ArticleViewModel> viewModel = _articleService.GetMyArticles();
            return Ok(viewModel);
        }

        [HttpGet, Route("GetArticleById/{articleId}")]
        public IActionResult GetArticleById(int articleId)
        {
            ArticleEditViewModel articleViewModel = _articleService.GetArticleById(articleId);
            return Ok(articleViewModel);
        }

        [HttpPost, Route("UpdateArticle/{articleId}")]
        public IActionResult UpdateArticle(AddArticleDto addArticleDto, int articleId)
        {
            OperationResult operationResult = _articleService.UpdateArticle(addArticleDto, articleId);
            return Ok(operationResult);
        }

        [HttpDelete, Route("DeleteArticle/{articleId}")]
        public IActionResult RemoveArticle(int articleId)
        {
            OperationResult operationResult = _articleService.RemoveArticle(articleId);
            return Ok(operationResult);
        }
    }
}