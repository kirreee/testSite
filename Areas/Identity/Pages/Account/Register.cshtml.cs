using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Bilect.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Bilect.Services.Interfaces;

namespace Bilect.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterModel : PageModel
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IMailService _mailService;


        public RegisterModel(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<RegisterModel> logger,
            IMailService mailService
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _mailService = mailService;

        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress(ErrorMessage = "E-postadressen är inte giltig")]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [StringLength(100, ErrorMessage = "Lösenordet måste innehålla minst 6 tecken", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Password")]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "Confirm password")]
            [Compare("Password", ErrorMessage = "Lösenordet stämmer inte överens")]
            public string ConfirmPassword { get; set; }
            [Required(ErrorMessage = "Namn måste fyllas i")]
            public string Name { get; set; }

            [Required(ErrorMessage = "Telefonnummer måste fyllas i")]
            [Phone(ErrorMessage = "Telfonummret är inte giltig")]
            public string PhoneNumber { get; set; }

            [Required(ErrorMessage = "Adress måste fyllas i")]
            public string Address { get; set; }

            [Required(ErrorMessage = "Postnummer måste fyllas i")]
            public string ZipCode { get; set; }

            [Required(ErrorMessage = "Stad måste fyllas i")]
            public string City { get; set; }

            public string Description { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");

            bool isEmailSent = false;

            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    UserName = Input.Email,
                    Email = Input.Email,
                    Name = Input.Name,
                    PhoneNumber = Input.PhoneNumber,
                    Address = Input.Address,
                    ZipCode = Input.ZipCode,
                    City = Input.City
                };

                var result = await _userManager.CreateAsync(user, Input.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { area = "Identity", userId = user.Id, code = code },
                        protocol: Request.Scheme);

                    string emailTo = user.Email;
                    string userName = user.UserName;

                    isEmailSent = _mailService.SendVerficationCode(callbackUrl, emailTo, userName);
                    if (!isEmailSent)
                    {
                        ViewData["emailSenderMsg"] = "-" + "Failed to send verification code";
                        return Page();
                    }
                    
                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        return RedirectToPage("RegisterConfirmation", new { email = Input.Email });
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return LocalRedirect(returnUrl);
                    }
                }
                
                foreach (var error in result.Errors)
                {
                    ViewData["registerMsg"] = "-" + error.Description;
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
