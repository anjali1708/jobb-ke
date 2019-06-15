from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
from django.http import JsonResponse
from bs4 import BeautifulSoup
import requests
import json


def homeView(request):
    data = dict()
    id = 1

    try:
        response = requests.get("https://ihub.co.ke/jobs")
    except requests.exceptions as err:
        print(err)
    else:
        soup = BeautifulSoup(response.text, "html.parser")
        jobs_list = soup.find_all("div", {"class":"jobsboard-row"})

        for job in jobs_list:
            job_dict = dict()
            job_title = list(job.find_all("a"))[1].text
            company = job.find("div", {"class":"job-company"}).text
            job_more = "https://ihub.co.ke{}".format(job.find("a", {"class":"job-more"})["href"])
            description = job.find("div", {"class":"post-description"}).find("a").text

            job_dict.update({"company_name":company, "job_title":job_title,"description":description, "job_details":job_more})
            data[id] = job_dict
            
            id += 1

    return JsonResponse(data)


def ajax(request):
    return render(request, "test.html")