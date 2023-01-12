from rest_framework.pagination import PageNumberPagination

class EmailPagination(PageNumberPagination):
    page_size = 4
    