FROM mongo:5.0 
COPY init-db.js /docker-entrypoint-initdb.d/init-db.js
COPY attendees.json /docker-entrypoint-initdb.d/attendees.json
EXPOSE 27017
CMD ["mongod"]
