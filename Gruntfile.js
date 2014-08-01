//module.exports = function (grunt) {
//   项目配置
//  grunt.initConfig({
//    pkg: grunt.file.readJSON('package.json'),
//    uglify: {
//      options: {
//        banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//      },
//      build: {
//        src: 'src/<%=pkg.file %>.js',
//        dest: 'dest/<%= pkg.file %>.min.js'
//      }
//    }
//  });
//   加载提供"uglify"任务的插件
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//   默认任务
//  grunt.registerTask('default', ['uglify']);
//}
module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['Rain-CSS-Framework/js/*.js'],
        dest: 'Rain-CSS-Framework/js/dest/libs.js'
      }
    },
    uglify: {
      build: {
        src: 'Rain-CSS-Framework/js/dest/libs.js',
        dest: 'Rain-CSS-Framework/js/dest/libs.min.js'
      }
    },
    qunit: {
      files: ['test/*.html']
    },
    jshint: {
      files: ['Rain-CSS-Framework/js/*.js', 'test/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        asi:true
      }
    },       
		browserSync: {
		      default_options: {
		        bsFiles: {
		            src: [
		                "Rain-CSS-Framework/css/*.css",
		                '**/*.html'
		            ]
		        }
		    },
		    options: {
		      watchTask: true
		    }
		},
    watch: {
      files: ['Rain-CSS-Framework/js/*.js'],
      tasks: ['jshint', 'qunit']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  //在命令行执行 "grunt test" 会运行 test 任务
  grunt.registerTask('test', ['jshint']);
  
  //在命令行执行 "grunt test" 会运行 test 任务
  grunt.registerTask('con', ['concat','uglify']);

  // 在命令行执行 "grunt" 会运行 default 任务
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  //浏览器样式等文件注入
  grunt.registerTask('brroo', ['browserSync', 'watch']);
}
/*module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  //为了介绍自定义任务搞了一个这个
  grunt.registerTask('build', 'require demo', function () {
    //任务列表
    var tasks = ['requirejs'];
    //源码文件
    var srcDir = 'src';
    //目标文件
    var destDir = 'dest';
    //设置参数
    grunt.config.set('config', {
      srcDir: srcDir,
      destDir: destDir
    });
    //设置requireJs的信息
    var taskCfg = grunt.file.readJSON('gruntCfg.json');
    var options = taskCfg.requirejs.main.options,
        platformCfg = options.web,
        includes = platformCfg.include,
        paths = options.paths;
    var pos = -1;
    var requireTask = taskCfg.requirejs;
    options.path = paths;
    options.out = platformCfg.out;
    options.include = includes;
    //运行任务
    grunt.task.run(tasks);
    grunt.config.set("requirejs", requireTask);
  });
}*/