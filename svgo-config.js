// module.exports = {
export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIDs: false,
          removeUselessDefs: false,
        },
      },
    },
  ]
}
