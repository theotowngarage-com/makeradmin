FROM python:3.11-alpine

RUN apk update \
    && apk add \
       netcat-openbsd \
       less \
       curl \
       zlib-dev \
       jpeg-dev \
       build-base \
       python3-dev \
       libffi-dev \
       libressl-dev \
       linux-headers \
       cargo \
    && rm -rf /var/cache/apk/*

RUN mkdir -p /work/ && mkdir -p /work/logs

VOLUME /work/logs

COPY default-product-image.png /work

COPY requirements.txt /work

RUN pip install -U pip
RUN pip install -r /work/requirements.txt

# Remove bloat
       #jpeg-dev \ used for firstrun...
RUN apk del \
       less \
       curl \
       zlib-dev \
       build-base \
       python3-dev \
       libffi-dev \
       libressl-dev \
       linux-headers \
       cargo \
    && rm -rf /var/cache/apk/*

COPY run.sh dispatch_emails.sh accessy_syncer.sh /work/

COPY src /work/src

EXPOSE 80

WORKDIR "/work/src"

CMD ["/work/run.sh"]
