# [MyBatis] MyBatis+Sping boot简单使用

## 快速使用

### POM配置

```xml
<dependency>
	<groupId>org.mybatis.spring.boot</groupId>
	<artifactId>mybatis-spring-boot-starter</artifactId>
	<version>2.0.1</version>
</dependency>
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
</dependency>
```

### 属性配置

```
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/mytest?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true
spring.datasource.username=root
spring.datasource.password=xiaozhang
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### Pojo对象

```java
//POJO
public class Order {

    private Integer Id;
    private String OrderNo;

    public Integer getId() {
        return Id;
    }
    public void setId(Integer id) {
        Id = id;
    }
    public String getOrderNo() {
        return OrderNo;
    }
    public void setOrderNo(String orderNo) {
        OrderNo = orderNo;
    }
}
//Mapper
//这里可以使用@Repository也可以使用@Component，目的是使用@Component让spring自动扫描bean，方便spring使用IOC注入OrderMapper
//@Repository
@Component
@Mapper
public interface OrderMapper {
    @Insert("insert into `order`(OrderNo) values(#{OrderNo})")
    int saveOrder(Order order);
}

//调用，直接以IOC的方式注入即可
public class HomeController{
   @Autowired
	OrderMapper orderMapper; 
}
```



## Sping-boot IOC管理Mabatis的SqlSession

## 关系

### 1对1查询

```java
//Order
public class Order {
    private int Id;
    private String OrderNo;
    private String Title;
    private OrderLocation Origin;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getOrderNo() {
        return OrderNo;
    }

    public void setOrderNo(String orderNo) {
        OrderNo = orderNo;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public OrderLocation getOrigin() {
        return Origin;
    }

    public void setOrigin(OrderLocation origin) {
        Origin = origin;
    }
}

//OrderLocation
public class OrderLocation {
    private int Id;
    private String Title;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }
}

//OrderMapper
@Repository
@Mapper
public interface OrderMapper {

    @Insert("insert into `order`(`OrderNo`, `Title`) values(#{OrderNo}, #{Title})")
    int createOrder(Order order);

    @Select("select o.Id, o.OrderNo, o.Title from `order` o")
    //结果映射
    @Results({
    	@Result(
            //sql查询中，返回的列，一般用作查询的参数
			column = "Id",
            //需要映射到的PO(持久化对象)上的属性
			property = "Origin",
            //映射到查询
			one = @One(select = "getOrigin")
        )
    })
    List<Order> getOrders();

    //查询装卸地
    @Select("select ol.Id, Title from `orderlocation` ol where ol.OrderId = #{orderId}")
    OrderLocation getOrigin(int orderId);

}
```

