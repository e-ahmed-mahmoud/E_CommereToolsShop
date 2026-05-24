using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Common.Result;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


public class PaymentController(IPaymentService paymentService, IGenericRepository<DeliveryMethod> dmRepo) : BaseApiController
{
    private readonly IPaymentService _paymentService = paymentService;
    private readonly IGenericRepository<DeliveryMethod> _dmRepo = dmRepo;

    [Authorize]
    [HttpPost("{cartId}")]
    public async Task<ActionResult<Result<ShoppingCart>>> CreateOrUpdatePaymentIntent([FromRoute] string cartId)
    {
        var res = await _paymentService.CreateOrUpdatePaymentPayloadAsync(cartId);
        return res.IsSuccess ? Ok(res.Value) : res.ToProblem(400);
    }

    [HttpGet("delivery-methods")]
    [Authorize]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
    {
        return Ok(await _dmRepo.GetAllAsync());
    }
}
