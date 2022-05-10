package com.example.shop.filter;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.shop.security.JWTUtil;
import com.example.shop.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {
    @Autowired
    JWTUtil jwtUtil;

    @Autowired
    UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if(authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer ")){
            String jwt = authHeader.substring(7);
            if(jwt.isBlank()){
                throw new ServletException("Error auth");
            } else {
                try {
                    String name = jwtUtil.validateToken(jwt);
                    UserDetails userDetails = userService.loadUserByUsername(name);
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(name,
                            userDetails.getPassword(),userDetails.getAuthorities());
                    if(SecurityContextHolder.getContext().getAuthentication() == null){
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                } catch (JWTVerificationException jwtVerificationException){
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "INVALID JWT TOKEN");
                }
            }
        }
        filterChain.doFilter(request,response);
    }
}
