module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress source-map-loader warnings for Firebase
      // Find and modify source-map-loader rules
      const rules = webpackConfig.module.rules;
      
      rules.forEach((rule) => {
        // Check if this rule uses source-map-loader
        if (rule.use && Array.isArray(rule.use)) {
          rule.use.forEach((useItem) => {
            if (typeof useItem === 'object' && useItem.loader && useItem.loader.includes('source-map-loader')) {
              // Add exclude for Firebase packages
              if (!rule.exclude) {
                rule.exclude = [];
              }
              if (Array.isArray(rule.exclude)) {
                rule.exclude.push(/node_modules\/@firebase/);
                rule.exclude.push(/node_modules\/firebase/);
              } else {
                rule.exclude = [rule.exclude, /node_modules\/@firebase/, /node_modules\/firebase/];
              }
            }
          });
        }
      });
      
      return webpackConfig;
    },
  },
};

