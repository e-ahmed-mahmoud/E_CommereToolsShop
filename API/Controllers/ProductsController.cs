using API.Helpers;
using Core.Common.Result;
using Core.DTOs.Product;
using Core.Entities;
using Core.Errors;
using Core.Interfaces;
using Core.Specifications;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProductsController(IUnitOfWork unitOfWork, IFileServices fileServices) : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IFileServices _fileServices = fileServices;

    [HttpGet]
    public async Task<ActionResult<Result>> Get([FromQuery] ProductSpecParams specParams, CancellationToken cancellationToken)
    {
        var specificaiton = new ProductSpecification(specParams);

        var res = await CreatePagination<Product, Product>(_unitOfWork.Repository<Product>(), specificaiton, specParams.PageNumber, specParams.PageSize, cancellationToken);

        return Ok(res.IsSuccess ? res.Value : res.Error);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Result<ProductRespons>>> GetById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        if (!_unitOfWork.Repository<Product>().IsExists(id))
            return Result.Failure<ProductRespons>(ProductErrors.NotDefinedProduct);
        var result = await _unitOfWork.Repository<Product>().GetByIdAsync(id, cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> AddProduct([FromForm] Helpers.ProductCreateRequest productCreateRequest, CancellationToken cancellationToken)
    {

        var fileSaved = await _fileServices.SaveFileAsync(productCreateRequest.File, cancellationToken);
        if (!fileSaved.Item1)
        {
            return BadRequest();
        }

        var product = productCreateRequest.Adapt<Product>();
        product.PictureUrl = fileSaved.Item2;
        _unitOfWork.Repository<Product>().Add(product);

        return await _unitOfWork.SaveChangesAsync() ?
            CreatedAtAction("GetById", new { id = product.Id }, product)
            : BadRequest();
        // return Ok();
    }
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] Product product)
    {
        if (!_unitOfWork.Repository<Product>().IsExists(product.Id))
            return NotFound();

        _unitOfWork.Repository<Product>().Update(product);
        return await _unitOfWork.SaveChangesAsync() ? NoContent() : BadRequest();

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id, cancellationToken);
        if (product is null)
            return NotFound();

        _unitOfWork.Repository<Product>().Delete(product);

        return await _unitOfWork.SaveChangesAsync() ? NoContent() : BadRequest();
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<string>>> GetBrands(CancellationToken cancellationToken)
    {
        var brandSpecification = new BrandListSpecification();
        return Ok(await _unitOfWork.Repository<Product>().GetAllAsync(brandSpecification, cancellationToken));
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<string>>> GetTypes(CancellationToken cancellationToken)
    {
        var typeSepcificaiton = new TypeListSpecification();
        return Ok(await _unitOfWork.Repository<Product>().GetAllAsync(typeSepcificaiton, cancellationToken));
    }

}
