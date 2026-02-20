from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="main"),
    path('archit', views.archit, name="archit"),
    path('oper', views.oper, name="oper"),
    path('hdd', views.hdd, name="hdd"),
    path('ssd', views.ssd, name="ssd"),
    path('cpu', views.cpu, name="cpu"),
    path('gpu', views.gpu, name="gpu"),
    path('turing', views.turing, name="turing"),
    path('machine', views.machine, name="machine"),
    path('kvant_history', views.kvant_history, name="kvant_history"),
    path('kvant_machine', views.kvant_machine, name="kvant_machine"),
    path('motherboard', views.motherboard, name="motherboard"),
    path('psu', views.psu, name="psu")
]
