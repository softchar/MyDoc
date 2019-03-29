# Spring MVC常用注解

## @RequestBody

```java
@PostMapping("postjson")
public String PostJson(@RequestBody PostJsonRequest request)
{
	System.out.println("UserAccount: " + request.UserAccount);
	System.out.println("Password: " + request.UserAccount);
	return "home/postjson";
}
```

