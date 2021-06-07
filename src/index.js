function importAll(context) {
  context.keys().forEach(context);
}

importAll(require.context('./assets', true, /(?<!(style-delete))(\.scss|\.js)$/));