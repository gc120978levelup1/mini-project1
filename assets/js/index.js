import {categories} from "../data/categories.js"
import {mobiles} from "../data/mobiles.js"

if (document.getElementById("categories-list"))
document.getElementById("categories-list").innerHTML = /*html*/
`${
    categories.map((item) => `
        <div class="col mb-5 style-animate-selection">
            <a href="${item.link}">
                <div align="center">
                    <img
                        height="140px"
                        width="140px"
                        src="${item.image}"
                        alt="${item.name}"
                        class="rounded-circle"
                    />
                </div>
                <div align="center" class="style-category-name">
                    <h4> ${item.name} </h4>
                </div>
            </a>
        </div>
    `).join('\n')
}`

if (document.getElementById("mobiles-list"))
document.getElementById("mobiles-list").innerHTML = /*html*/
`${
    mobiles.map((item) => `
            <div class="col mb-5" >
              <div class="card mb-3 border-3 p-0 position-relative">
                ${(item.on_sale) ? `
                <img
                    height="70px"
                    src="/assets/img/sale.png"
                    alt="on sale"
                    class="position-absolute top-0 start-0"
                />` : ''}
                <img
                    height="240px"
                    src="${item.main_image}"
                    alt="${item.description}"
                    class="card-img-top"
                />
                <div class="card-body" align="center">
                    <h5 class="card-title">${item.description}</h5>
                    <p class="card-text">${item.specs}</p>
                    <h4 class="text-warning"> <b> <i> ₱ ${item.unit_price.toLocaleString()} </i> </b> </h4>
                    ${(item.on_sale) ? `
                        <p class="card-text"><small class="text-muted">discounted ${item.discount_p}% off <span class="text-decoration-line-through"><b>₱ ${((item.unit_price) / ((100-item.discount_p)/100)).toLocaleString()}</b></span></small></p>
                    ` : ''}
                    <div align="center" class="d-flex flex-row justify-content-center">
                        <div class="p-2"> <h6>Sold <span class="badge bg-success">${item.sold}</span></h6> </div>
                        <div class="p-2"> <h6>Available <span class="badge bg-danger">${item.qty - item.sold}</span></h6> </div>
                    </div>
                    ${((item.qty - item.sold) > 0) ? `
                        <button type="button" class="btn btn-primary">
                            <i class="fa fa-cart-plus fa-lg" aria-hidden="true"></i>
                            &nbsp;
                            Add to Cart
                        </button>
                    ` : ''}
                </div>
                </div>
            </div>
    `).join('\n')
}`