Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },

    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {

                    this.$data.products.push(item);
                    this.$data.filtered.push(item);

                }
                this.$parent.imgProd(this.products);

            });

    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },

    },
    template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.img"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="product-item">
                <div class="imageCont"><img :src="img" alt="Some img"></div> 
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
                </div>
            </div>
    `
})