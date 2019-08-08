    
Pod::Spec.new do |s|

  s.name        = "QrCode"

  s.version     = "1.0.0"

  s.summary     = "some interesting summary."

  s.description = "some interesting summary. 123123"

  s.license     = { :type => "MIT", :file => "LICENSE" }

  s.homepage    = "https://github.com/shifeng1993/react-native-qr-scanner"

  s.source      = { :git => "https://github.com/shifeng1993/react-native-qr-scanner.git", :tag => "#{s.version}" }

  s.author      = "Igor"

  s.platform    = :ios, "9.0"

  s.source_files    = "QrCode/", "QrCode/*.{h,m}"

  s.frameworks       = ["UIKit", "AVFoundation", "CoreImage"]

  s.dependency 'React'

  end
