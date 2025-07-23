import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-100 to-blue-200 flex flex-col items-center font-sans">
      {/* Content Section */}
      <div className="w-full max-w-6xl px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h2 className="text-5xl font-extrabold text-[#1e293b] mb-6 text-shadow-md transition-all hover:text-pink-600 duration-300">
              हम कौन हैं
            </h2>
            <p className="text-gray-800 leading-relaxed text-lg bg-white/60 backdrop-blur-md p-6 rounded-lg shadow-md border border-white/30">
              हम एक उत्साही टीम हैं जो नवाचार और सहयोग के माध्यम से बदलाव लाने
              के लिए प्रतिबद्ध है। हमारा प्लेटफॉर्म व्यक्तियों और संगठनों को
              उनकी सच्ची क्षमता को अनलॉक करने के लिए सशक्त बनाने के लिए डिज़ाइन
              किया गया है।
            </p>
          </div>

          {/* Right (image) */}
          <div className="relative group">
            <img
              src="https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="rounded-xl shadow-2xl border-4 border-white transform transition duration-500 group-hover:scale-105 group-hover:rotate-1"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full bg-gradient-to-tr from-purple-100 via-blue-50 to-pink-100 py-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-purple-700 mb-14 drop-shadow-sm hover:drop-shadow-xl transition-all duration-300">
          हमारी टीम से मिलिए
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
          {[
            {
              name: "शिवम",
              role: "मुख्य संपादक",
              img: "https://images.tv9hindi.com/wp-content/uploads/2023/09/bhagalpur-shivam.jpg",
              gradient: "from-orange-100 to-red-100",
              ring: "ring-orange-300",
            },
            {
              name: "निखिल कुमार",
              role: "संस्थापक एवं मुख्य तकनीकी अधिकारी",
              img: "https://scontent.fccu13-4.fna.fbcdn.net/v/t39.30808-6/335423936_5738603446248264_6845822091094828248_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=NojFeSiC9BAQ7kNvwH35wrG&_nc_oc=AdlFRcpNSx-zrn-K66upN5qNK5YlZkpZn-Iwrs77PS6kUz4lyFnAUJPJYFY7vQnFDMZPro91vxP36Y8UwScKj2gT&_nc_zt=23&_nc_ht=scontent.fccu13-4.fna&_nc_gid=pJJ-6ep23bDiTjYTBY5xqg&oh=00_AfRl3Vt7swXNbAe_jlG-1LlW6cyzvE_GjkJg_sRZ2YSD6A&oe=6884E075",
              gradient: "from-indigo-100 to-blue-100",
              ring: "ring-indigo-300",
            },
            {
              name: "रेवती",
              role: "प्रमुख डिज़ाइनर",
              img: "https://scontent.fccu13-2.fna.fbcdn.net/v/t39.30808-1/318330327_111867041760819_2453401554089552404_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Zaq77JhmhXsQ7kNvwFVWCQj&_nc_oc=AdmlLCi6OVf_59JCLuOI-GK4E0RqEESiytZR7tZbKB6NgtO-HCi0x4r77jJFhXHkAn1RWOuJRcdVPhXaHN96y9CU&_nc_zt=24&_nc_ht=scontent.fccu13-2.fna&_nc_gid=QsZPRNAmK5nqPVxo_8AOEg&oh=00_AfSYZL87FV6ykNbRjUQAS_R8vi_VdpFsIJuJx0Nwp7MVuw&oe=6884D218",
              gradient: "from-pink-100 to-rose-100",
              ring: "ring-pink-300",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${member.gradient} shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl p-6 text-center transform hover:-translate-y-1 border border-white/40 backdrop-blur-sm`}
            >
              <img
                src={member.img}
                alt={member.name}
                className={`w-28 h-28 rounded-full mx-auto mb-4 border-4 shadow-md transition-transform duration-300 hover:scale-105 ${member.ring}`}
              />
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-700 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
