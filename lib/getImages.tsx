export const getCourseImage = (courseId: string): string => {
    const imageMap: Record<string, string> = {
      "educational-tv-programs-design-and-production":
        "/تصميم-وانتاج-برامج-التليفزيون.jpg",
      "augmented-reality-technology": "/تكنولوجيا-الواقع-المعزز.jpg",
      "educational-games-design-and-production":
        "/تصميم-وانتاج-الالعاب-التعليمية.jpg",
      "educational-websites-design-and-production":
        "/تصميم-وانتاج-المواقع-التعليمية.jpg",
      "e-book-design": "/تصميم-كتاب-الكتروني.jpg",
      "simulation-methods-and-design": "/اساليب-المحاكاه.jpg",
      "digital-images-production-and-processing": "/الصور-الرقمية.jpg",
      "adaptive-learning-environments": "/بيئات-التعليم-التكيفيه.jpg",
      "digital-applications-in-education":
        "/توظيف-التطبيقات-الرقمية-في-التعليم.jpg",
      "graduation-project-extended": "/مشروع-التخرج.jpg",
      "action-research-extended": "/بحوث-الفعل.jpg",
      "cybersecurity-in-education": "/الامن-السيبراني.jpg",
      "field-training-4": "/تدريب-ميداني.jpg",
      "field-training-5": "/تدريب-ميداني.jpg",
      "digital-empowerment": "/مصادر-ثلاثيه-الابعاد.jpg",
      "3d-learning-resources": "/مصادر-ثلاثيه-الابعاد.jpg",
      "programming-and-applications": "/البرمجة-وتطبيقاتها.jpg",
      "learning-analytics-in-educational-environments": "/تحليلات-التعلم.jpg",
      "e-courses-design-and-production": "/تصميم-المقررات-وانتاجها.jpg",
      "educational-robotics": "/الروبوتات.jpg",
      "digital-content-management-systems": "/نظم-ادارة-المحتوي-الرقمي.jpg",
      "educational-game-motivators": "/محفزات-الالعاب.jpg",
      "theoretical-foundations-for-special-groups":
        "/الاسس-النظرية-لتعليم-ذوي-الفئات-الخاصة.jpg",
      "digital-learning-resource-centers": "/مركز-مصادر-التعلم-الرقمي.jpg",
      "photography": "/التصوير-الفوتوغرافي.jpg",
      "introduction-to-instructional-design": "/مدخل-الي-التصميم-التعليمي.jpg",
      "theoretical-foundations-of-integrated-media":
        "/الاسس-النظرية-للوسائط-المتكاملة.jpg",
      "radio-and-audio-recordings": "/الاذاعة-والتسجيلات-الصوتية.jpg",
      "e-learning": "/التعليم-الالكتروني.jpg",
      "digital-educational-communication": "/الاتصال-التعليمي-الرقمي.jpg",
      "educational-computer-networks": "/شبكات-الكمبيوتر-التعليمية.jpg",
      "e-learning-environments": "/بيئات-التعلم-الالكتروني.jpg",
      "static-and-animated-educational-graphics":
        "/الرسوم-التعليمية-المتحركة-والثابته.jpg",
      "readings-in-english": "/قراءات-في-التخصص-باللغه-الانحليزية.jpg",
      "multimedia-environments-for-special-groups":
        "/تصميم-وانتاج-بيئات-الوسائط-المتكاملة-للفئات-الخاصه.jpg",
      "accelerated-learning-and-smart-surfaces": "/التعليم-المعجل.jpg",
      "user-interfaces-in-virtual-learning-environments": "/وجهات-المستخدم.jpg",
      "interactive-video-environments": "/بيئات-الفيديو-التفاعلي.jpg",
      "educational-virtual-museums": "/المتاحف-الافتراضية.jpg",
      "educational-websites-production": "/انتاج-المواقع-التعليمية.jpg",
      "digital-learning-environments-and-tools":
        "/بيئات-التعلم-الرقمي-وادواتها.jpg",
      "interactive-virtual-technology": "/التكنولوجيا-الافتراضية-التفاعلية.jpg",
      "learning-resources-for-special-groups":
        "/مصادر-التعلم-للفئات-الخاصة.png",
    };

    // Return the mapped image or a default image if not found
    return imageMap[courseId] || "/placeholder.svg?height=200&width=200";
  };
