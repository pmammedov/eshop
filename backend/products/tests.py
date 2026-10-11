from decimal import Decimal
from rest_framework.test import APITestCase
from .models import Product


class ProductListAPITests(APITestCase):
    def setUp(self):
        Product.objects.create(
            name='Test Mouse',
            description='A wireless mouse',
            price=Decimal('19.99'),
            stock=5,
        )

    def test_list_returns_200(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, 200)

    def test_list_returns_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Mouse')
        self.assertEqual(response.data[0]['price'], '19.99')