from rest_framework.pagination import PageNumberPagination

class LeadsPagination(PageNumberPagination):
    page_size = 4