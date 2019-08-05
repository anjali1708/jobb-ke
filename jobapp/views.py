from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
from django.http import JsonResponse
from bs4 import BeautifulSoup
import requests
import json
from threading import Thread
from multiprocessing import Process
import os
import time


def homeView(request):
    data = dict()
    id = 1
    try:
        response = requests.get("https://ihub.co.ke/jobs")
    except requests.exceptions as err:
        print(err)
    else:
        soup = BeautifulSoup(response.text, "lxml")
        jobs_list = soup.find_all("div", {"class":"jobsboard-row"})

        for job in jobs_list:
            job_dict = dict()
            job_title = list(job.find_all("a"))[1].text
            company = job.find("div", {"class":"job-company"}).text
            job_more = "https://ihub.co.ke{}".format(job.find("a", {"class":"job-more"})["href"])
            description = job.find("div", {"class":"post-description"}).find("a").text
            add_date = job.find("div", {"class":"job-time"}).text
            job_category = job.find("div", {"class":"job-cat"}).text
            company_link = job.find("a", {"class": "post-company"})["href"]
            job_dict.update({"company_name":company, "job_title":job_title,"description":description, "job_details":job_more, "add_date":add_date, "job_category":job_category, "company_link":company_link})
            data[id] = job_dict
            
            id += 1

    return JsonResponse(data)



def search(request):
    keyword = ("-").join(request.GET["keyword"].split(" "))
    category = request.GET["job_category"]
    print(category)
    start_time = time.time()
    # keyword = "software-developer"
    # response_dict = {}
    glass_dict = {}

    def brighter():
        url = "https://www.brightermonday.co.ke/jobs/{}/?q={}&sort_by=new".format(category,keyword)       
        headers = {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/  74.0.3729.169 Chrome74.0.3729.169 Safari/537.36',
        }
        response = requests.get(url, headers=headers)
        brighter_soup = BeautifulSoup(response.text, "lxml")
        glass_id = len(glass_dict)
        jobs = brighter_soup.find_all("article", {"class": "search-result"})

        for job in jobs:
            company = job.find("div", {"class":"search-result__job-meta"}).text
            job_title = job.find("a",{"class":"search-result__job-title"})["title"]
            job_link = job.find("a",{"class":"search-result__job-title"})["href"]
            job_desc = job.find("div", {"class":"search-result__body"})
            if(job_desc is not None):
                job_desc = job_desc.text
            job_type = job.find("span",{"class":"search-result__job-type"}).text
            job_salary = job.find("div",{"class":"search-result__job-salary"}).text
            job_location = job.find("div",{"class":"search-result__location"}).text

            glass_dict[glass_id] = {"company":company, "job_title":job_title, "job_link":job_link,"job_desc":job_desc, "job_type":job_type, "job_salary":job_salary, "job_location":job_location}
            glass_id += 1


    # def glassdoor():
    #     url = "https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword={}&sc.keyword={}&locT=N&locId=130&jobType=".format(keyword,keyword)
    #     headers = {
    #         'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/  74.0.3729.169 Chrome74.0.3729.169 Safari/537.36',
    #     }
    #     glass_id = len(glass_dict)
    #     response = requests.get(url, headers=headers)
    #     soup = BeautifulSoup(response.text, "lxml")
    #     jobs = soup.find_all("li",{"class":"jl"})
    #     # print(url)
    #     for job in jobs:
    #         # print(job.find("div",{"class":"jobEmpolyerName"}))
    #         company = job.find("div",{"class" : "jobEmpolyerName"}).text
    #         job_title = job.find("div",{"class":"jobContainer"}).a.text
    #         job_link = "https://www.glassdoor.com{}".format(job.find("div",{"class":"jobContainer"}).a["href"])
    #         job_location = job.find("span",{"class":"loc"}).text

    #         glass_dict[glass_id] = {"company":company, "job_title":job_title, "job_link":job_link, "job_location":job_location}
    #         glass_id = glass_id + 1

        # response_dict["glassdoor"] = glass_dict
        # response_dict["glassdoor_count"] = glass_id
    
    # def ihub():
    #     try:
    #         ihub_response = requests.get("https://ihub.co.ke/jobs")
    #     except requests.exceptions as err:
    #         print(err)
    #     else:
    #         id = 1
    #         ihub_soup = BeautifulSoup(ihub_response.text, "lxml")
    #         jobs_list = ihub_soup.find_all("div", {"class":"jobsboard-row"})
    #         hub_dict = {}
    #         for job in jobs_list:
    #             job_title = list(job.find_all("a"))[1].text
    #             company = job.find("div", {"class":"job-company"}).text
    #             job_more = "https://ihub.co.ke{}".format(job.find("a", {"class":"job-more"})["href"])
    #             description = job.find("div", {"class":"post-description"}).find("a").text
    #             # hub_dict.update({"company_name":company, "job_title":job_title,"description":description,   "job_details":job_more})
    #             hub_dict[id] = {"company_name":company, "job_title":job_title,"description":description,  "job_details":job_more}
    #             id += 1
            
    #         response_dict["ihub"] = hub_dict
    #         response_dict["ihub_count"] = id

    # p = Pool(10)  # Pool tells how many at a time
    # glassdoor_process = p.map(parse, glassdoor)
    # ihub_process = p.map(parse, ihub)
    # p.terminate()
    # p.join()

    threads = []

    # for i in range(os.cpu_count()):
    #     threads.append(Thread(target=brighter))
         # threads.append(Thread(target=glassdoor))

    # for thread in threads:
    #     thread.start()
    
    # for thread in threads:
    #     thread.join()

    # glassdoor()
    brighter()
    print(time.time() - start_time)
    return JsonResponse(glass_dict)






# def job_info(request):
#     return JsonResponse(data)


def ajax(request):
    return render(request, "test.html")



def home(request):
    return render(request, "index.html")