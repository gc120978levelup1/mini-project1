import {users             } from "../data/users.js"
import {categories        } from "../data/categories.js"
import {mobiles           } from "../data/mobiles.js"
import {mobile_accessories} from "../data/mobile_accessories.js"
import {laptops           } from "../data/laptops.js"
import {desktops          } from "../data/desktops.js"
import {parts             } from "../data/parts.js"
import {bags              } from "../data/bags.js"
import {geek_tshirts      } from "../data/geek_tshirts.js"
import {shoes             } from "../data/shoes.js"

document.addEventListener("DOMContentLoaded", () => {

    let all_items = [
                     ...mobiles, 
                     ...mobile_accessories, 
                     ...laptops, 
                     ...desktops, 
                     ...parts, 
                     ...bags, 
                     ...geek_tshirts, 
                     ...shoes,
                    ]

    function check_login_status_if_OK(){
        let login_status = localStorage.getItem('myStore-login');
        if (login_status !== '1'){
            window.location = 'login.html';
            return false
        }else{
            return true
        }
    }

    function getRating(rating){
        let ret = ""
        for (let i = 0; i < rating; i++){
            ret += ' ⭐';
        }
        return ret;
    }

    function addCart(items, xid){
        let cart_list = JSON.parse(localStorage.getItem('myStore-cart')) // fetch current cart contents from local storage
        let x = items.filter((item) => (item.id === xid));               // search item with id = xid from list of items
        cart_list.push(x[0]);                                            // add the found item to cart list
        localStorage.setItem('myStore-cart', JSON.stringify(cart_list))  // store the new cart list contents to local storage
    }

    // show items before being added to the shopping cart
    function getCardInnerHTMLof(items){
        return  items.map((item) => `
                        <div class="col mb-5" >
                            <div class="card mb-3 border-3 p-0 position-relative">
                                ${(item.on_sale) ? `
                                    <img
                                        height="70px"
                                        src="/assets/img/sale.png"
                                        alt="on sale"
                                        class="position-absolute top-0 start-0"
                                    />` : ''}
                                <!-- Modal Trigger -->
                                <img
                                    height="240px"
                                    src="${item.main_image}"
                                    alt="${item.description}"
                                    class="card-img-top image-selection"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop-${item.id}"
                                />
                                <div class="card-body" align="center">
                                    <h5 class="card-title" style="height:25px;overflow-y:hidden">${item.description}</h5>
                                    <p class="card-text" style="height:75px;overflow-y:hidden">${item.specs}</p>
                                    <h4 class="text-warning" style="height:40px;overflow-y:hidden;white-space:nowrap;"> <b> <i> ₱${item.unit_price.toLocaleString()} </i> </b> </h4>
                                    ${(item.on_sale) ? `
                                        <p class="card-text" style="height:25px;overflow-y:hidden;white-space:nowrap;"><small class="text-muted">discounted ${item.discount_p}% off <span class="text-decoration-line-through"><b>₱ ${((item.unit_price) / ((100-item.discount_p)/100)).toLocaleString()}</b></span></small></p>
                                    ` : '<p class="text-white" style="height:25px;overflow-y:hidden">x</p>'}
                                    <div align="center" class="d-flex flex-row justify-content-center">
                                        <div class="p-2"> Sold <span class="badge bg-success">${item.sold}</span> </div>
                                        <div class="p-2"> Available <span class="badge bg-danger">${item.qty - item.sold}</span> </div>
                                    </div>
                                    <div style="height:50px;overflow-y:hidden">
                                        ${getRating(item.review_rate)}
                                    </div>
                                    ${((item.qty - item.sold) > 0) ? `
                                        <button 
                                            type="button" 
                                            class="btn btn-primary" 
                                            id="add-cart-${item.id}"
                                            data-bs-toggle="modal" data-bs-target="#success-added-${item.id}"
                                        >
                                            <i class="fa fa-cart-plus fa-lg" aria-hidden="true"></i>
                                            &nbsp;
                                            Add to Cart
                                        </button>
                                    ` : '<br>'}
                                </div>
                            </div>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="staticBackdrop-${item.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header bg-primary-subtle">
                                            <h5 class="modal-title" id="staticBackdropLabel">${item.description}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ${item.images.map((file) => `
                                                <img
                                                    width="100%"
                                                    src="${file.url}"
                                                    alt="${file.url}"
                                                />
                                                <br/>
                                                <br/>
                                            `).join('\n')}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" id="success-added-${item.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header bg-primary-subtle">
                                            <h5 class="modal-title" id="staticBackdropLabel">${item.description}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="history.go(0);"></button>
                                        </div>
                                        <div class="modal-body">
                                            <h3 class="text-success">
                                                <i class="fa fa-check-circle fa-lg" aria-hidden="true"></i>
                                                Successfully Added the item to your shopping cart.
                                            </h3>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="history.go(0);">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    `).join('\n')
    }

    // show items after it has been added to the shopping cart
    function getCartListInnerHTMLof(items){
        return  items.map((item, i) => `
                        <div class="col mb-5" >
                            <div class="card mb-3 border-3 p-0 position-relative">
                                ${(item.on_sale) ? `
                                    <img
                                        height="70px"
                                        src="/assets/img/sale.png"
                                        alt="on sale"
                                        class="position-absolute top-0 start-0"
                                    />` : ''}
                                <!-- Modal Trigger -->
                                <img
                                    height="240px"
                                    src="${item.main_image}"
                                    alt="${item.description}"
                                    class="card-img-top image-selection"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop-${item.id}"
                                />
                                <div class="card-body" align="center">
                                    <h5 class="card-title" style="height:25px;overflow-y:hidden">${item.description}</h5>
                                    <p class="card-text" style="height:75px;overflow-y:hidden">${item.specs}</p>
                                    <h4 class="text-warning" style="height:40px;overflow-y:hidden;white-space:nowrap;"> <b> <i> ₱${item.unit_price.toLocaleString()} </i> </b> </h4>
                                    ${(item.on_sale) ? `
                                        <p class="card-text" style="height:25px;overflow-y:hidden;white-space:nowrap;"><small class="text-muted">discounted ${item.discount_p}% off <span class="text-decoration-line-through"><b>₱ ${((item.unit_price) / ((100-item.discount_p)/100)).toLocaleString()}</b></span></small></p>
                                    ` : '<p class="text-white" style="height:25px;overflow-y:hidden">x</p>'}
                                    <div align="center" class="d-flex flex-row justify-content-center">
                                        <div class="p-2"> Sold <span class="badge bg-success">${item.sold}</span> </div>
                                        <div class="p-2"> Available <span class="badge bg-danger">${item.qty - item.sold}</span> </div>
                                    </div>
                                    <div style="height:50px;overflow-y:hidden">
                                        ${getRating(item.review_rate)}
                                    </div>
                                    ${((item.qty - item.sold) > 0) ? `
                                        <button 
                                            type="button" 
                                            class="btn btn-danger" 
                                            id="${i}"
                                        >
                                            <i class="fa fa-opencart fa-lg" aria-hidden="true"></i>
                                            &nbsp;
                                            Remove from Cart
                                        </button>
                                    ` : '<br>'}
                                </div>
                            </div>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="staticBackdrop-${item.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header bg-primary-subtle">
                                            <h5 class="modal-title" id="staticBackdropLabel">${item.description}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ${item.images.map((file) => `
                                                <img
                                                    width="100%"
                                                    src="${file.url}"
                                                    alt="${file.url}"
                                                />
                                                <br/>
                                                <br/>
                                            `).join('\n')}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    `).join('\n')
    }

    // show items after it has been checked out
    function getIncomingListInnerHTMLof(items){
        return  items.map((item, i) => `
                        <div class="col mb-5" >
                            <div class="card mb-3 border-3 p-0 position-relative">
                                ${(item.on_sale) ? `
                                    <img
                                        height="70px"
                                        src="/assets/img/sale.png"
                                        alt="on sale"
                                        class="position-absolute top-0 start-0"
                                    />` : ''}
                                <!-- Modal Trigger -->
                                <img
                                    height="240px"
                                    src="${item.main_image}"
                                    alt="${item.description}"
                                    class="card-img-top image-selection"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop-${item.id}"
                                />
                                <div class="card-body" align="center">
                                    <h5 class="card-title" style="height:25px;overflow-y:hidden">${item.description}</h5>
                                    <p class="card-text" style="height:75px;overflow-y:hidden">${item.specs}</p>
                                    <p class="card-text">Ordered last ${item.order_date}</p>
                                    <p class="card-text">${item.payment_method}</p>
                                    <h4 class="text-warning" style="height:40px;overflow-y:hidden;white-space:nowrap;"> <b> <i> ₱${item.unit_price.toLocaleString()} </i> </b> </h4>
                                    ${(item.on_sale) ? `
                                        <p class="card-text" style="height:25px;overflow-y:hidden;white-space:nowrap;"><small class="text-muted">discounted ${item.discount_p}% off <span class="text-decoration-line-through"><b>₱ ${((item.unit_price) / ((100-item.discount_p)/100)).toLocaleString()}</b></span></small></p>
                                    ` : '<p class="text-white" style="height:25px;overflow-y:hidden">x</p>'}
                                </div>
                            </div>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="staticBackdrop-${item.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header bg-primary-subtle">
                                            <h5 class="modal-title" id="staticBackdropLabel">${item.description}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ${item.images.map((file) => `
                                                <img
                                                    width="100%"
                                                    src="${file.url}"
                                                    alt="${file.url}"
                                                />
                                                <br/>
                                                <br/>
                                            `).join('\n')}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    `).join('\n')
    }


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

    let incoming_deliveries_list = document.getElementById("incoming-deliveries-list");
    if (incoming_deliveries_list){
        let upcoming_deliveries = JSON.parse(localStorage.getItem('myStore-upcoming-deliveries'));
        incoming_deliveries_list.innerHTML = `${ getIncomingListInnerHTMLof(upcoming_deliveries) }`
    }

    let mobiles_list = document.getElementById("mobiles-list");
    if (mobiles_list) {
        mobiles_list.innerHTML = `${ getCardInnerHTMLof(mobiles) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of mobiles){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(mobiles, item.id);
                }
            }
        }
    }

    let mobile_accessories_list = document.getElementById("mobile_accessories-list");
    if (mobile_accessories_list) {
        mobile_accessories_list.innerHTML = `${ getCardInnerHTMLof(mobile_accessories) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of mobile_accessories){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(mobile_accessories, item.id);
                }
            }
        }
    }

    let laptops_list = document.getElementById("laptops-list");
    if (laptops_list) {
        laptops_list.innerHTML = `${ getCardInnerHTMLof(laptops) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of laptops){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(laptops, item.id);
                }
            }
        }
    }    

    let desktops_list = document.getElementById("desktops-list");
    if (desktops_list) {
        desktops_list.innerHTML = `${ getCardInnerHTMLof(desktops) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of desktops){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(desktops, item.id);
                }
            }
        }
    }  

    let parts_list = document.getElementById("parts-list");
    if (parts_list) {
        parts_list.innerHTML = `${ getCardInnerHTMLof(parts) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of parts){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(parts, item.id);
                }
            }
        }
    } 

    let bags_list = document.getElementById("bags-list");
    if (bags_list) {
        bags_list.innerHTML = `${ getCardInnerHTMLof(bags) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of bags){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(bags, item.id);
                }
            }
        }
    } 

    let geek_tshirts_list = document.getElementById("geek_tshirts-list");
    if (geek_tshirts_list) {
        geek_tshirts_list.innerHTML = `${ getCardInnerHTMLof(geek_tshirts) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of geek_tshirts){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(geek_tshirts, item.id);
                }
            }
        }
    } 

    let shoes_list = document.getElementById("shoes-list");
    if (shoes_list) {
        shoes_list.innerHTML = `${ getCardInnerHTMLof(shoes) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of shoes){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(shoes, item.id);
                }
            }
        }
    } 

    let search_list = document.getElementById("search-list")
    if (search_list){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let fstring = urlParams.get('search').toString().toUpperCase();
        let filtered = all_items.filter((item) => (
            item.description.toUpperCase().includes(fstring) || item.specs.toUpperCase().includes(fstring) || (fstring === '')
        ))
        search_list.innerHTML = `${ getCardInnerHTMLof(filtered) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of filtered){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(filtered, item.id);
                }
            }
        }
    }

    let on_sale_list = document.getElementById("on-sale-list")
    if (on_sale_list){
        // combine all products into a single list
        let filtered = all_items.filter((item) => (
            item.on_sale === true
        ))
        on_sale_list.innerHTML = `${ getCardInnerHTMLof(filtered) }`
        // add on-click handler for add cart buttons for mobiles
        for (let item of filtered){
            let  a = document.getElementById(`add-cart-${item.id}`);
            if (a){
                a.onclick = () => {
                    if (check_login_status_if_OK()) addCart(filtered, item.id);
                }
            }
        }
    }

    let login = document.getElementById('loginModal');
    if (login){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let res = users.filter((item) => (item.email1 === urlParams.get('email1') && item.password1 === urlParams.get('password1')))
        if (res.length == 1){
            localStorage.setItem('myStore-login', '1');
            localStorage.setItem('myStore-user-info', JSON.stringify(res[0]));
            localStorage.setItem('myStore-email',urlParams.get('email1'));
            localStorage.setItem('myStore-cart', '[]');
            localStorage.setItem('myStore-upcoming-deliveries', '[]');
            let url= `dashboard.html?email1=${urlParams.get('email1')}`;
            window.location = url;
        }
    }

    let logout = document.getElementById('logoutModal');
    if (logout){
        localStorage.setItem('myStore-login', '0');
        localStorage.setItem('myStore-user-info', JSON.stringify({}));
        localStorage.setItem('myStore-email','');
        localStorage.setItem('myStore-cart', '[]');
        localStorage.setItem('myStore-upcoming-deliveries', '[]');
    }

    let img = document.getElementById('main-icon')
    if (img){
        let login_status = localStorage.getItem('myStore-login');
        if (login_status === '1'){
            let user_info = JSON.parse(localStorage.getItem('myStore-user-info'));
            img.src = user_info.img;
        }else{
            img.src = "./assets/img/favicon.jpg";
        }
    }
    
    let dashboard = document.getElementById('dashboard')
    if (dashboard){
        let login_status = localStorage.getItem('myStore-login');
        if (login_status !== '1'){
            window.location = 'login.html';
        }
    }

    let checkout = document.getElementById('checkout');
    if (checkout){
        let login_status = localStorage.getItem('myStore-login');
        if (login_status !== '1'){
            window.location = 'login.html';
        }
    }

    let user_info2 = document.getElementById('user-info')
    if (user_info2){
        let login_status = localStorage.getItem('myStore-login');
        if (login_status !== '1'){
            window.location = 'login.html';
        }
    }

    let inIndexHtml = document.getElementById('index-navigation');
    if (inIndexHtml){
        let login_status = localStorage.getItem('myStore-login');
        if (login_status === '1'){ //user is logged in
            inIndexHtml.innerHTML =/*html*/`  
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="dashboard.html">
                                        Dashboard
                                        &nbsp;
                                        <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        &nbsp;
                                    </li>
                                    <li class="nav-item">
                                        <span class="text-primary position-relative">
                                        <h5 class="position-absolute top-50 start-100 translate-middle ">
                                            <span class="badge rounded-circle bg-danger">
                                                <span id="nos-of-items-in-cart">99+</span>
                                                <span class="visually-hidden">unread messages</span>
                                            </span>
                                        </h5>
                                        </span>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="logout.html">Logout</a>
                                    </li>
                                    `
        }else{ //user is logged out
            inIndexHtml.innerHTML =/*html*/`  
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="login.html">Login</a>
                                    </li>`
        }
    }

    let shopping_cart_list = document.getElementById('shopping-cart-list')
    if (shopping_cart_list){
        let email1    = localStorage.getItem('myStore-email');
        let cart_list = JSON.parse(localStorage.getItem('myStore-cart'));
        shopping_cart_list.innerHTML = `${ getCartListInnerHTMLof(cart_list) }`
        // add on-click handler for add cart buttons for mobiles
        let i = 0;
        for (let item of cart_list){
            let  a = document.getElementById(`${i}`);
            if (a){
                a.onclick = () => {
                    console.log(cart_list.splice(parseInt(a.id), 1))
                    localStorage.setItem('myStore-cart', JSON.stringify(cart_list));
                    history.go(0);
                }
            }
            i++;
        }
    }

    let nos_items_in_cart = document.getElementById('nos-of-items-in-cart')
    if (nos_items_in_cart){
        nos_items_in_cart.innerHTML = '0'
        let cart_list = JSON.parse(localStorage.getItem('myStore-cart'));
        console.log(cart_list)
        if (cart_list){
            nos_items_in_cart.innerHTML = cart_list.length.toLocaleString();
        }
    }

    let nos_items_incoming = document.getElementById('nos-of-items-incoming');
    if (nos_items_incoming){
        nos_items_incoming.innerHTML = '0'
        let cart_list = JSON.parse(localStorage.getItem('myStore-upcoming-deliveries'));
        if (cart_list){
            nos_items_incoming.innerHTML = cart_list.length.toLocaleString();
        }
    }

    let user_info1 = document.getElementById('user-info')
    if (user_info1){
        let user_info = JSON.parse(localStorage.getItem('myStore-user-info'));
        document.getElementById('user-name'            ).innerHTML = user_info.name
        document.getElementById('user-contact-info'    ).innerHTML = user_info.contact
        document.getElementById('user-email-info'      ).innerHTML = user_info.email1
        document.getElementById('user-shipping-address').innerHTML = user_info.address 
        document.getElementById('user-image'           ).src       = user_info.img
    }

    let checkout_grand_total = document.getElementById('checkout-grand-total')
    if (checkout_grand_total){
        function process_checkout(){
            let vd = -0.1; // voucher discount
            let voucher_code = document.getElementById('voucher-code-input')
            if (voucher_code.value === '') vd = 0.0;
            let user_info = JSON.parse(localStorage.getItem('myStore-user-info'));
            document.getElementById('user-name'            ).innerHTML = user_info.name
            document.getElementById('user-contact-info'    ).innerHTML = user_info.contact
            document.getElementById('user-email-info'      ).innerHTML = user_info.email1
            document.getElementById('user-shipping-address').innerHTML = user_info.address
            let cart_list = JSON.parse(localStorage.getItem('myStore-cart'));
            let sub_total = 0;
            for (let item of cart_list) {
                sub_total += item.unit_price; 
            }
            let shipping_cost          = Math.round(0.012 * sub_total);
            let shipping_cost_discount = Math.round(-0.3 * shipping_cost);
            let voucher_discount       = Math.round(vd * sub_total);
            let grand_total = sub_total + shipping_cost + shipping_cost_discount + voucher_discount;

            document.getElementById('checkout-sub-total'            ).innerHTML = sub_total.toLocaleString('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('checkout-shipping-fee'         ).innerHTML = shipping_cost.toLocaleString('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('checkout-shipping-fee-discount').innerHTML = shipping_cost_discount.toLocaleString('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('voucher-discount'              ).innerHTML = voucher_discount.toLocaleString('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('checkout-grand-total'          ).innerHTML = grand_total.toLocaleString('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }

        process_checkout()
        document.getElementById('place-order-btn').addEventListener('click', ()=>{
            let vd = -0.1; // voucher discount
            let voucher_code = document.getElementById('voucher-code-input')
            if (voucher_code.value === '') vd = 0.0;
            let upcoming_deliveries = JSON.parse(localStorage.getItem('myStore-upcoming-deliveries'));
            let cart_list = JSON.parse(localStorage.getItem('myStore-cart'));
            for (let item of cart_list) {
                item.order_date = (new Date(Date.now())).toString();
                let payment_method = '';
                if (document.getElementById('payByCOD').checked) payment_method = "Cash On Delivery"
                if (document.getElementById('payByCC').checked) payment_method = "Pay Using Credit Card"
                item.payment_method = payment_method
                let sub_total = item.unit_price;
                let shipping_cost = Math.round(0.012 * sub_total);
                let shipping_cost_discount = Math.round(-0.3 * shipping_cost);
                let voucher_discount       = Math.round(vd * sub_total);
                let grand_total = sub_total + shipping_cost + shipping_cost_discount + voucher_discount;
                item.unit_price = grand_total;
                upcoming_deliveries.push(item);
            }
            localStorage.setItem('myStore-upcoming-deliveries', JSON.stringify(upcoming_deliveries));
            localStorage.setItem('myStore-cart', '[]');
        })

        document.getElementById('voucher-code-input').addEventListener('keydown', ()=>{
            process_checkout()
        })
        
    }

});