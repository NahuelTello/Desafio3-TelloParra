class ProductManager {
    constructor () {
        this.products = [];
        this.filePath = './productos.json';
    }

    async init() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            this.products = JSON.parse(data);
        } catch (err) {
            await this.saveProducts();
        }
    }

    async saveProducts() {
        await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2));
    }

    generateId() {
        if (this.id) {
            this.id++
        } else {
            //Si no existe le asigna 1
            this.id = 1
        }
        return this.id
    }

    async getProducts() {
        return this.products;
    }

    async addProduct(product) {
        const id = this.generateId();
        const newProduct = { ...product, id };
        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
    }

    async getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    async updateProduct(id, updateData) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        this.products[productIndex] = { ...this.products[productIndex], ...updateData };
        await this.saveProducts();
        return this.products[productIndex];
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        this.products.splice(productIndex, 1);
        await this.saveProducts();
    }
}
export default ProductManager;
export const productManager = new ProductManager();
