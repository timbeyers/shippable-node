### Usage
Add this package to your package.json file, and in your `shippable.yml` add the following lines:

```yaml
after_failure:
  - node node_modules/slack-shippable/index.js

after_success:
  - node node_modules/slack-shippable/index.js -s
```

Remember about setting these environment variables in your `shippable.yml`:
 - SLACK_HOOK_URL - incoming webook url from your slack integrations page
 - SLACK_CHANNEL - name of a channel for the messages to be sent ("#general" by default)
