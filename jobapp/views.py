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



def search(request):
    keyword = ("-").join(request.GET["keyword"].split(" "))
    # keyword = "software-developer"
    response_dict = {}

    url = "https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword={}&sc.keyword={}&locT=N&locId=130&jobType=".format(keyword,keyword)
    headers = {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/  74.0.3729.169 Chrome74.0.3729.169 Safari/537.36',
    }

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    jobs = soup.find_all("li",{"class":"jl"})
    print(url)
    glass_dict = {}
    glass_id = 1
    for job in jobs:
        # print(job.find("div",{"class":"jobEmpolyerName"}))
        company = job.find("div",{"class" : "jobEmpolyerName"}).text
        job_title = job.find("div",{"class":"jobContainer"}).a.text
        job_link = "https://www.glassdoor.com{}".format(job.find("div",{"class":"jobContainer"}).a["href"])
        glass_dict[glass_id] = {"company":company, "job_title":job_title, "job_link":job_link}
        glass_id = glass_id + 1

    response_dict["glassdoor"] = glass_dict
    response_dict["glassdoor_count"] = glass_id
    
    try:
        ihub_response = requests.get("https://ihub.co.ke/jobs")
    except requests.exceptions as err:
        print(err)
    else:
        id = 1
        ihub_soup = BeautifulSoup(ihub_response.text, "html.parser")
        jobs_list = ihub_soup.find_all("div", {"class":"jobsboard-row"})
        hub_dict = {}
        for job in jobs_list:
            job_title = list(job.find_all("a"))[1].text
            company = job.find("div", {"class":"job-company"}).text
            job_more = "https://ihub.co.ke{}".format(job.find("a", {"class":"job-more"})["href"])
            description = job.find("div", {"class":"post-description"}).find("a").text
            # hub_dict.update({"company_name":company, "job_title":job_title,"description":description,   "job_details":job_more})
            hub_dict[id] = {"company_name":company, "job_title":job_title,"description":description,  "job_details":job_more}
            id += 1
        
        response_dict["ihub"] = hub_dict
        response_dict["ihub_count"] = id


    return JsonResponse(response_dict)


# def job_info(request):


def ajax(request):
    return render(request, "test.html")



def home(request):
    return render(request, "index.html")