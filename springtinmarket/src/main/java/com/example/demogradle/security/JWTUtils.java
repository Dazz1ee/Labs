package com.example.demogradle.security;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTUtils {
    @Value("${jwt_secret}")
    private String secret;

    @Value("${jwt_name}")
    private String name;

    public String getJWT(HttpServletRequest request){
        Cookie cookie = WebUtils.getCookie(request, name);
        if(cookie != null){
            System.out.println(cookie);
            return cookie.getValue();
        } else {
            return null;
        }
    }

    public ResponseCookie generateJWTCookie(UserDetailsImp userDetails){
        String jwt = generateJWT(userDetails.getUsername());
        return ResponseCookie.from(name, jwt).path("/tinmarket").maxAge(7*24 * 60 * 60).httpOnly(true).build();
    }

    public String generateJWT(String username){


        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String validateToken(String token){
        try {
            return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e){
            e.getMessage();
        }
        return null;
    }
    public ResponseCookie getCleanJwtCookie() {
        return ResponseCookie.from(name, null).path("/tinmarket").build();
    }
}
