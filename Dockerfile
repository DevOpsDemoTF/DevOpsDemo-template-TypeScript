FROM denoland/deno:alpine-1.17.0 as build
WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# Compile the main app so that it doesn't need to be compiled each startup/entry.
ADD . .
RUN deno cache main.ts

FROM build as test
# TODO produce JUnit test result file
RUN deno test

FROM build

EXPOSE 8080
EXPOSE 9102

ENV LOG_LEVEL "DEBUG"

# COPY --from=test /app/test-results.xml /app/

USER deno
WORKDIR /app
CMD ["run", "--allow-net", "--allow-env", "main.ts"]
