import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      name: 'imthanhluan',
      email: 'imthanhluan@gmail.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: true,
    },
    {
      name: 'thaonguyen',
      email: 'thaonguyen@gmail.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image:
        'https://res.cloudinary.com/dtgze0gxj/image/upload/v1656162686/test/y8hzxn8hl6qigbanwrjk.webp',
      price: 120,
      countInStock: 0,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image:
        'https://res.cloudinary.com/dtgze0gxj/image/upload/v1655476780/test/ovpxlh7kdlowqvei28sy.webp',
      price: 250,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Nike Slim Pant',
      slug: 'nike-slim-pant',
      category: 'Pants',
      image:
        'https://res.cloudinary.com/dtgze0gxj/image/upload/v1655469699/test/z6g4vxxi35xd4ga59qbw.webp',
      price: 25,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Pant',
      slug: 'adidas-fit-pant',
      category: 'Pants',
      image:
        'https://res.cloudinary.com/dtgze0gxj/image/upload/v1656162773/test/y4a65lrtngce5at6gmhq.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
  ],
}
export default data
