from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from django.conf import settings
from django.contrib import auth
import jwt
import logging
from decouple import config


class RegisterView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            data = request.data
            username = data.get('username', '')
            auth_token = jwt.encode(
                {'username': username
                 }, config("JWT_SECRET_KEY"), algorithm="HS256")
            return Response({'data': serializer.data, 'token': auth_token}, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        data = request.data
        username = data.get('username', '')
        password = data.get('password', '')
        user = auth.authenticate(username=username, password=password)

        if user:
            auth_token = jwt.encode(
                {'username': user.username
                 }, config("JWT_SECRET_KEY"), algorithm="HS256")

            serializer = UserSerializer(user)

            data = {'user': serializer.data, 'token': auth_token}

            return Response(data, status=status.HTTP_200_OK)

        return Response({'success': False, 'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class IsAuthView(GenericAPIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        if permissions.IsAuthenticated:
            return Response({'success': True},status=status.HTTP_200_OK)
    

