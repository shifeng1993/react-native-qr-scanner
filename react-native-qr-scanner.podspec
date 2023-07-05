require 'json'
version = JSON.parse(File.read('package.json'))["version"]

Pod::Spec.new do |s|
  s.name             = 'react-native-qr-scanner'
  s.version          = version
  s.summary          = 'react-native-qr-scanner'
  s.homepage         = 'https://github.com/shifeng1993/react-native-qr-scanner'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = "Igor"
  s.source           = { :git => 'https://github.com/shifeng1993/react-native-qr-scanner.git', :tag => "v#{s.version}" }

  s.platform    = :ios, "9.0"

  s.source_files = 'ios/**/*.{h,m,mm}'
  s.frameworks       = ["UIKit", "AVFoundation", "CoreImage"]
  s.dependency 'React'

end
