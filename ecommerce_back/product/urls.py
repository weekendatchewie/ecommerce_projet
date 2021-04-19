from django.urls import path, include

from . import views

urlpatterns = [
    path('latest-product/', views.LatestProductsList.as_view()),
]