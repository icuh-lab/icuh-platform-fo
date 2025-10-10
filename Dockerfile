# Dockerfile

# 1. 빌드(Build) 스테이지
# --------------------
# ✅ [수정됨] 프로젝트의 Node 버전에 맞게 20.19.5-alpine으로 변경합니다.
FROM node:20.19.5-alpine AS builder

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# package.json과 lock 파일을 먼저 복사하여 의존성을 캐싱합니다.
COPY package.json package-lock.json ./
RUN npm install

# VITE_API_URL 빌드 인자를 선언합니다.
ARG VITE_API_URL

# .env 파일에 빌드 시 사용할 환경 변수를 설정합니다.
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env

# 나머지 소스 코드를 복사합니다.
COPY . .

# Vite 프로젝트를 빌드합니다.
RUN npm run build


# 2. 프로덕션(Production) 스테이지
# --------------------
# 경량 웹서버인 Nginx를 기반으로 최종 이미지를 생성합니다.
FROM nginx:1.25-alpine

# 빌드 스테이지에서 생성된 정적 파일들을 Nginx의 기본 웹 루트로 복사합니다.
COPY --from=builder /app/dist /usr/share/nginx/html

# 커스텀 Nginx 설정을 복사합니다. (React Router 등 SPA 라우팅 지원)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 컨테이너가 80번 포트를 사용하도록 설정합니다.
EXPOSE 80

# Nginx 서버를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]