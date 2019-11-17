﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bilect.DAL.Dtos;
using Bilect.DAL.HelperModels;
using Bilect.DAL.ViewModels;
using Bilect.Services.Helpers;
using Bilect.Services.Interfaces;
using Microsoft.AspNetCore.Http;
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

        [HttpGet,Route("GetArticles")]
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
    }
}