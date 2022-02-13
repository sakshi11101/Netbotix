# Netbotix
Hack-A-Web Hackathon by E-Cell Summit NITB


```
# Netbotix
Hack-A-Web Hackathon by E-Cell Summit NITB


We have created a API which is hosted on this base url 

```
base_url = 
```

Endpoints 


This will create a signup account for company and college
```
POST /api/v1/signup
```
In body you need to send this following data 

```
{
    "name":"random Company",
    "email":"random2@gmail.com",
    "Contact_Email":"123@gmail.com",
    "Contact_Name":"random",
    "password":"12345678",
    "type":"c"
}
```

This will login into account of company and college
```
POST /api/v1/login
```

In login you need to send this data 

```
{
    "email":"random2@gmail.com",
    "password":"12345678",
    "type":"c"
}
```


Only company can add opportunity

```
POST /api/v1/opportunity
```

In this you need to send this data as body 

```
{
    "companyName":"random opp",
    "jobTitle":"random1",
    "jobDesc":"random1",
    "eligibility":"random1",
    "country":"INd",
    "state":"omd",
    "typeOfJob":"in"
}
```


Only College can get all the opportunities here

```
GET /api/v1/opport
