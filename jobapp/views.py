from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
# Create your views here.

def homeView(request):
    return render(request, "index.html")