"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { Maximize2, Users, FileText, ChevronDown, ChevronRight, Info, CheckCircle2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoordinatorNode {
  id: string;
  role: { id: string; en: string };
  name: string;
  initials: string;
  desc: { id: string; en: string };
  responsibilities: { id: string[]; en: string[] };
}

interface OrgNode {
  id: string;
  role: { id: string; en: string };
  name: string;
  initials: string;
  desc: { id: string; en: string };
  responsibilities: { id: string[]; en: string[] };
  coordinators?: CoordinatorNode[];
  children?: OrgNode[];
}

const ORG_DATA: OrgNode = {
  id: "principal",
  role: { id: "Kepala Sekolah", en: "Principal" },
  name: "Misra, S.Pd., M.Pd.",
  initials: "MS",
  desc: {
    id: "Pimpinan tertinggi satuan pendidikan SMAN Modal Bangsa, bertanggung jawab atas manajemen sekolah, pelaksanaan kurikulum, pembinaan GTK, dan hubungan eksternal.",
    en: "The highest leadership of SMAN Modal Bangsa, responsible for school management, curriculum implementation, staff development, and external relations."
  },
  responsibilities: {
    id: [
      "Menyusun dan mengevaluasi rencana program jangka panjang, menengah, dan tahunan sekolah.",
      "Membina dan mengawasi kinerja seluruh Guru dan Tenaga Kependidikan.",
      "Mengelola anggaran dan sarana prasarana sekolah secara akuntabel.",
      "Membangun kerja sama strategis dengan instansi pemerintah, komite, dan mitra luar."
    ],
    en: [
      "Drafting and evaluating long-term, medium-term, and annual school program plans.",
      "Guiding and supervising the performance of all Teachers and Education Staff.",
      "Managing school budget and infrastructure resources accountably.",
      "Building strategic cooperation with government agencies, school committee, and partners."
    ]
  },
  children: [
    {
      id: "committee",
      role: { id: "Komite Sekolah", en: "School Committee" },
      name: "Drs. Bukhari M. Ali",
      initials: "KS",
      desc: {
        id: "Lembaga mandiri sekolah yang wadahi peran serta masyarakat dalam meningkatkan mutu, pemerataan, dan efisiensi pengelolaan pendidikan.",
        en: "An independent school body hosting public participation to improve quality, equality, and efficiency of educational management."
      },
      responsibilities: {
        id: [
          "Memberikan pertimbangan dalam penentuan dan pelaksanaan kebijakan pendidikan.",
          "Menggalang dana dan sumber daya pendidikan dari masyarakat.",
          "Melakukan pengawasan terhadap kualitas pelayanan pendidikan di sekolah."
        ],
        en: [
          "Providing considerations in determining and implementing education policies.",
          "Mobilizing education funds and resources from the community.",
          "Supervising the quality of educational services at school."
        ]
      }
    },
    {
      id: "waka-asrama",
      role: { id: "Kepala Asrama", en: "Head of Boarding" },
      name: "Laswardi, S.Pd.",
      initials: "AS",
      desc: {
        id: "Mengatur tata tertib kehidupan berasrama harian siswa, pengasuhan, pembinaan akhlak, keamanan, dan kesehatan di lingkungan asrama.",
        en: "Regulating daily boarding rules, student care, character building, security, and health inside the dormitories."
      },
      responsibilities: {
        id: [
          "Mengawasi tata tertib harian dan jam malam asrama putra & putri.",
          "Mengoordinasikan guru asrama, pamong, dan pembina asrama.",
          "Memastikan kelancaran logistik dan kesehatan lingkungan asrama."
        ],
        en: [
          "Supervising daily rules and curfews for boys & girls dormitories.",
          "Coordinating dormitory teachers, caretakers, and advisors.",
          "Ensuring smooth logistics and environmental hygiene in dorms."
        ]
      }
    },
    {
      id: "waka-sarpras",
      role: { id: "Sarpras", en: "Facilities & Assets" },
      name: "Rahmat, S.Pd.",
      initials: "SP",
      desc: {
        id: "Merencanakan pemeliharaan gedung kelas, laboratorium, asrama, sarana olahraga, serta inventarisasi barang dan pemeliharaan rutin aset.",
        en: "Planning class buildings, laboratories, dorms, and sports facilities maintenance, asset inventory, and routine maintenance."
      },
      responsibilities: {
        id: [
          "Mendata kebutuhan sarana prasarana sekolah dan asrama.",
          "Mengatur pemeliharaan kebersihan dan fasilitas gedung.",
          "Mengoordinasikan pengelola barang dan pemeliharaan alat sekolah."
        ],
        en: [
          "Recording school and boarding facility infrastructure needs.",
          "Managing cleanliness maintenance and building facilities.",
          "Coordinating asset managers and school tool maintenance."
        ]
      },
      coordinators: [
        {
          id: "penjab-sarpras",
          role: { id: "Penjab Sarpras", en: "Facilities Coord." },
          name: "M. Amin",
          initials: "SP",
          desc: {
            id: "Membantu pengawasan kelayakan gedung kelas, laboratorium, asrama, sarana ibadah, dan inventaris fasilitas belajar.",
            en: "Assisting in supervising classrooms, laboratories, dorms, worship places, and learning facility inventory conditions."
          },
          responsibilities: {
            id: [
              "Mendata kerusakan prasarana sekolah secara berkala untuk tindak lanjut.",
              "Memantau kebersihan, kenyamanan, dan keamanan fasilitas fisik sekolah.",
              "Mengoordinasikan perbaikan sarpras tingkat ringan dengan tim kebersihan."
            ],
            en: [
              "Recording school infrastructure damage periodically for maintenance followup.",
              "Monitoring the cleanliness, comfort, and safety of physical facilities.",
              "Coordinating minor maintenance operations with the cleaning team."
            ]
          }
        },
        {
          id: "pengelola-barang",
          role: { id: "Pengelola Barang", en: "Asset Manager" },
          name: "Feri Ardiansyah, S.Hum.",
          initials: "PB",
          desc: {
            id: "Bertanggung jawab atas pencatatan, inventarisasi aset daerah, pemeliharaan logistik, dan pelaporan administrasi barang sekolah.",
            en: "Responsible for recording, regional asset inventory, logistics maintenance, and school goods administrative reporting."
          },
          responsibilities: {
            id: [
              "Mencatat dan menempelkan nomor registrasi inventaris pada setiap aset sekolah.",
              "Mengelola gudang logistik sekolah dan mendistribusikan kebutuhan rutin kelas.",
              "Menyusun Laporan Mutasi Barang secara periodik untuk diserahkan ke dinas terkait."
            ],
            en: [
              "Recording and affixing inventory registration numbers on all school assets.",
              "Managing school logistics storage and distributing routine classroom needs.",
              "Drafting Goods Mutation Reports periodically for submit to related departments."
            ]
          }
        }
      ]
    },
    {
      id: "waka-kurikulum",
      role: { id: "Kurikulum", en: "Curriculum" },
      name: "Drs. Suriyadi",
      initials: "KU",
      desc: {
        id: "Mengoordinasikan perencanaan, pelaksanaan, serta evaluasi kegiatan belajar-mengajar dan program akademik unggulan.",
        en: "Coordinating the planning, execution, and evaluation of teaching-learning activities and academic programs."
      },
      responsibilities: {
        id: [
          "Mengatur pembagian tugas mengajar guru dan jadwal pelajaran reguler.",
          "Mengoordinasikan program P1 (Akhlak/Nilai Islami) dan Program Khusus (Prosus).",
          "Mengawasi pelaksanaan Proses Belajar Mengajar (PBM) reguler."
        ],
        en: [
          "Arranging teachers' teaching assignments and regular class schedules.",
          "Coordinating P1 (Character/Islamic Values) and Special Programs (Prosus).",
          "Supervising the execution of regular teaching and learning processes (PBM)."
        ]
      },
      coordinators: [
        {
          id: "penjab-pbm-reguler",
          role: { id: "Penjab PBM Reguler", en: "PBM Regular Coord." },
          name: "Nelva Yunita, S.Si.",
          initials: "PBM",
          desc: {
            id: "Bertanggung jawab atas kelancaran proses belajar mengajar harian, pembagian jadwal piket, dan monitoring kelas reguler.",
            en: "Responsible for the smooth running of daily teaching and learning processes, shift scheduling, and regular class monitoring."
          },
          responsibilities: {
            id: [
              "Menyusun jadwal piket harian guru dan laporan kegiatan belajar mengajar harian.",
              "Memantau dan mengevaluasi kehadiran guru serta efektivitas pengajaran di kelas.",
              "Menyelesaikan hambatan operasional KBM harian."
            ],
            en: [
              "Drafting teacher daily shift schedules and daily learning activity reports.",
              "Monitoring and evaluating teacher attendance and classroom teaching effectiveness.",
              "Resolving daily classroom operational obstacles."
            ]
          }
        },
        {
          id: "penjab-p1",
          role: { id: "Penjab P1 (Akhlak/Nilai Islami)", en: "P1 Program Coord." },
          name: "Khudri, S.Pd.I.",
          initials: "P1",
          desc: {
            id: "Mengoordinasikan pembinaan karakter, nilai-nilai keagamaan, dan pembiasaan akhlak mulia bagi seluruh siswa.",
            en: "Coordinating character building, religious values, and noble moral habits for all students."
          },
          responsibilities: {
            id: [
              "Menyelenggarakan kajian keagamaan berkala dan ibadah berjamaah harian.",
              "Memantau kedisiplinan beribadah dan pembiasaan akhlak islami siswa.",
              "Mengembangkan materi pembinaan moral dan spiritual siswa."
            ],
            en: [
              "Organizing routine religious studies and daily congregational prayers.",
              "Monitoring worship discipline and students' Islamic moral habits.",
              "Developing moral and spiritual mentorship materials for students."
            ]
          }
        },
        {
          id: "penjab-prosus",
          role: { id: "Penjab Prosus (Program Khusus)", en: "Special Program Coord." },
          name: "Susinarli, S.Pd., M.Ed.",
          initials: "PS",
          desc: {
            id: "Mengelola program bimbingan intensif persiapan prestasi akademik tingkat tinggi, olimpiade, dan kompetisi eksternal.",
            en: "Managing intensive preparation programs for high-level academic achievements, olympiads, and external competitions."
          },
          responsibilities: {
            id: [
              "Menyusun kurikulum, silabus, dan jadwal bimbingan olimpiade sains.",
              "Mengoordinasikan pemateri ahli dari internal maupun eksternal sekolah.",
              "Mengevaluasi grafik pencapaian prestasi akademik siswa secara rutin."
            ],
            en: [
              "Structuring science olympiad tutoring curriculum, syllabus, and schedules.",
              "Coordinating expert instructors from both internal and external sources.",
              "Evaluating students' academic achievement progress charts routinely."
            ]
          }
        }
      ]
    },
    {
      id: "tps-chair",
      role: { id: "Ketua TPS", en: "TPS Chairman" },
      name: "Muhammad Iqbal, S.Si., M.Si.",
      initials: "TP",
      desc: {
        id: "Memimpin Test Preparation Service (TPS) untuk bimbingan intensif persiapan UTBK dan seleksi masuk perguruan tinggi negeri bagi siswa.",
        en: "Leading the Test Preparation Service (TPS) for intensive UTBK tutoring and university entrance exam selection prep."
      },
      responsibilities: {
        id: [
          "Menyusun silabus bimbel UTBK-SNBT dan ujian mandiri.",
          "Mengatur jadwal try-out ujian berkala bagi siswa kelas XII.",
          "Mengevaluasi grafik kesiapan kelulusan PTN siswa."
        ],
        en: [
          "Drafting UTBK-SNBT prep syllabus and independent entrance exams.",
          "Arranging routine mock exam (try-out) schedules for Grade XII.",
          "Evaluating student university entrance readiness graphs."
        ]
      },
      children: [
        {
          id: "perpus",
          role: { id: "Kepala Perpustakaan", en: "Head of Library" },
          name: "M. Iqbal, S.Pd., M.Pd.",
          initials: "PB",
          desc: {
            id: "Penanggung jawab pengelolaan perpustakaan sekolah dan gerakan literasi digital.",
            en: "Person in charge of school library management and digital literacy movement."
          },
          responsibilities: {
            id: ["Mengelola peminjaman pustaka & koleksi literatur.", "Mengembangkan e-library sekolah bagi siswa."],
            en: ["Managing library lending & literature collections.", "Developing school e-library platform for students."]
          }
        },
        {
          id: "lab",
          role: { id: "Kepala Laboratorium", en: "Head of Lab" },
          name: "Herman, S.Pd.",
          initials: "LB",
          desc: {
            id: "Penanggung jawab tata ruang, peralatan, bahan, dan keselamatan kerja laboratorium sekolah.",
            en: "Person in charge of laboratory layout, equipment, materials, and safety standards."
          },
          responsibilities: {
            id: ["Memantau kesediaan bahan praktikum Fisika, Kimia, Biologi.", "Mengatur jadwal penggunaan lab untuk praktikum siswa."],
            en: ["Monitoring Physics, Chemistry, Biology practical materials availability.", "Scheduling lab rooms utilization for student practical sessions."]
          }
        }
      ]
    },
    {
      id: "waka-kesiswaan",
      role: { id: "Kesiswaan", en: "Student Affairs" },
      name: "Laswardi, S.Pd.",
      initials: "KS",
      desc: {
        id: "Memimpin pembinaan disiplin siswa, kepemimpinan OSIS, pembinaan ekskul, pramuka, dan kegiatan kesiswaan lainnya.",
        en: "Leading student discipline building, student council leadership, extracurriculars, scouting, and other student affairs."
      },
      responsibilities: {
        id: [
          "Membimbing program kerja OSIS and kegiatan organisasi siswa.",
          "Mengoordinasikan pembinaan ekstrakurikuler bidang akademik dan non-akademik.",
          "Mengawasi kegiatan gerakan pramuka sekolah."
        ],
        en: [
          "Guiding student council (OSIS) programs and student organization activities.",
          "Coordinating extracurricular mentorship in both academic and non-academic fields.",
          "Supervising the school's scouting movement activities."
        ]
      },
      coordinators: [
        {
          id: "penjab-osis",
          role: { id: "Penjab OSIS", en: "OSIS Coordinator" },
          name: "Muhammad Zenyani, S.Pd.",
          initials: "OS",
          desc: {
            id: "Membimbing organisasi intra sekolah untuk mengembangkan kepemimpinan, kemandirian, dan kreativitas siswa.",
            en: "Guiding the intra-school student council to develop student leadership, independence, and creativity."
          },
          responsibilities: {
            id: [
              "Mendampingi rapat kerja, perencanaan, dan pelaksanaan program kerja OSIS.",
              "Mengawasi jalannya pemilihan pengurus OSIS serta kaderisasi kepemimpinan.",
              "Mengoordinasikan alokasi anggaran kegiatan kesiswaan bersama pimpinan."
            ],
            en: [
              "Assisting work meetings, planning, and execution of OSIS work programs.",
              "Supervising the election of council members and leadership regeneration.",
              "Coordinating budget allocation for student activities with school leaders."
            ]
          }
        },
        {
          id: "penjab-pramuka",
          role: { id: "Penjab Pramuka", en: "Scouting Coord." },
          name: "Eva Susanti, S.Ag., M.M.",
          initials: "PR",
          desc: {
            id: "Mengelola kegiatan kepramukaan wajib guna melatih kedisiplinan, kemandirian, patriotisme, dan kecakapan hidup siswa.",
            en: "Managing compulsory scouting activities to train students' discipline, independence, patriotism, and life skills."
          },
          responsibilities: {
            id: [
              "Menyusun rencana program latihan mingguan pramuka tingkat penegak.",
              "Mengoordinasikan upacara pelantikan pramuka bantara dan laksana.",
              "Mempersiapkan kontingen sekolah untuk kompetisi kepramukaan daerah & nasional."
            ],
            en: [
              "Drafting weekly scouting training plans for senior scout level.",
              "Coordinating the initiation ceremony for Bantara and Laksana scouts.",
              "Preparing the school contingent for regional and national scouting competitions."
            ]
          }
        },
        {
          id: "penjab-ekskul-non-akademik",
          role: { id: "Penjab Ekskul Non-Akademik", en: "Non-Acad. Club Coord." },
          name: "Dwi Artika Sari, S.Pd.",
          initials: "NA",
          desc: {
            id: "Mengoordinasikan seluruh ekstrakurikuler bidang olahraga, seni, musik, debat, dan kreativitas non-akademik.",
            en: "Coordinating all extracurricular clubs in sports, arts, music, debate, and non-academic creativity."
          },
          responsibilities: {
            id: [
              "Memfasilitasi pemilihan minat bakat seni dan olahraga siswa baru.",
              "Mengatur jadwal latihan, ketersediaan pelatih, dan fasilitas pendukung.",
              "Mengoordinasikan pendaftaran dan persiapan lomba non-akademik eksternal."
            ],
            en: [
              "Facilitating talent and interest selection in arts and sports for new students.",
              "Managing practice schedules, instructor availability, and supporting facilities.",
              "Coordinating registrations and preparations for external non-academic events."
            ]
          }
        },
        {
          id: "penjab-ekskul-akademik",
          role: { id: "Penjab Ekskul Akademik", en: "Acad. Club Coord." },
          name: "Sri Wahyuni, S.Si.",
          initials: "AK",
          desc: {
            id: "Mengelola kelompok belajar riset, karya ilmiah remaja, dan klub mata pelajaran penunjang sains & humaniora.",
            en: "Managing research study groups, youth scientific papers, and subject clubs supporting science & humanities."
          },
          responsibilities: {
            id: [
              "Mengaktifkan kelompok belajar sains (Sains Club) di luar jam reguler.",
              "Membimbing siswa dalam penyusunan proposal penelitian ilmiah remaja (KIR).",
              "Mengatur keikutsertaan siswa dalam lomba riset dan karya tulis ilmiah."
            ],
            en: [
              "Activating subject study groups (Science Club) outside regular hours.",
              "Guiding students in drafting youth scientific research proposals (KIR).",
              "Organizing student participation in research and writing competitions."
            ]
          }
        }
      ],
      children: [
        {
          id: "wali-kelas",
          role: { id: "Wali Kelas", en: "Homeroom Teachers" },
          name: "Wali Kelas TA 2025/2026",
          initials: "WK",
          desc: {
            id: "Guru yang ditugaskan sebagai pembimbing dan pengelola masing-masing kelas X, XI, dan XII untuk mendampingi perkembangan akademik dan karakter siswa.",
            en: "Teachers assigned as guides and managers for grades X, XI, and XII to assist students' academic and character development."
          },
          responsibilities: {
            id: [
              "Menjembatani administrasi nilai rapor dan bimbingan konseling kelas.",
              "Membina ketertiban, disiplin, dan kekeluargaan antar siswa di kelas.",
              "Menghubungkan sekolah dengan orang tua/wali murid secara berkala."
            ],
            en: [
              "Bridging grade report administration and classroom counseling.",
              "Nurturing class order, discipline, and fellowship among students.",
              "Connecting the school with parents/guardians periodically."
            ]
          }
        }
      ]
    },
    {
      id: "waka-humas",
      role: { id: "Humas", en: "Public Relations" },
      name: "Mawardi, S.Ag., M.Si.",
      initials: "HM",
      desc: {
        id: "Menyelenggarakan kemitraan dengan instansi pemerintah, media massa, wali murid, alumni, serta pengelolaan website dan publikasi sekolah.",
        en: "Developing partnerships with government, media, parents, alumni, and managing school website and publications."
      },
      responsibilities: {
        id: [
          "Menjembatani komunikasi sekolah dengan wali murid dan komite.",
          "Mengoordinasikan publikasi berita sekolah dan pengelolaan website resmi.",
          "Membina kerja sama strategis dengan instansi eksternal."
        ],
        en: [
          "Bridging school communications with parents and the committee.",
          "Coordinating school news publications and managing the official website.",
          "Nurturing strategic cooperation with external institutions."
        ]
      },
      coordinators: [
        {
          id: "penjab-humas",
          role: { id: "Penjab Humas", en: "PR Coordinator" },
          name: "Fadliansyah, S.Si.",
          initials: "HM",
          desc: {
            id: "Membantu penyelenggaraan kemitraan, publikasi berita resmi, dokumentasi kegiatan, dan hubungan masyarakat sekolah.",
            en: "Assisting in building partnerships, official news publication, event documentation, and school public relations."
          },
          responsibilities: {
            id: [
              "Mendokumentasikan seluruh kegiatan resmi and agenda penting sekolah.",
              "Menyusun draf berita resmi sekolah untuk dipublikasikan secara eksternal.",
              "Menjembatani kunjungan tamu dinas dan kerja sama kemitraan institusi."
            ],
            en: [
              "Documenting all official events and important school agendas.",
              "Drafting official school news releases for external publication.",
              "Bridging official guest visits and institutional partnership cooperation."
            ]
          }
        },
        {
          id: "penjab-web-sosmed",
          role: { id: "Penjab Web & Sosmed", en: "Web & Media Coord." },
          name: "Alfaruq Asri, S.Pd.",
          initials: "WS",
          desc: {
            id: "Mengelola portal informasi resmi website sekolah serta akun media sosial untuk keterbukaan informasi publik.",
            en: "Managing the official school website information portal and social media accounts for public transparency."
          },
          responsibilities: {
            id: [
              "Memperbarui dan memelihara konten website resmi SMAN Modal Bangsa.",
              "Mendesain infografis dan memublikasikan dokumentasi di media sosial resmi.",
              "Memantau keamanan sistem dan kelancaran akses portal informasi digital."
            ],
            en: [
              "Updating and maintaining contents of the official school website.",
              "Designing infographics and publishing updates on official social channels.",
              "Monitoring system security and digital information portal access smooth run."
            ]
          }
        }
      ]
    },
    {
      id: "admin",
      role: { id: "Kepala Tata Usaha", en: "Head of Administration" },
      name: "Fittriani, S.E.",
      initials: "TU",
      desc: {
        id: "Penanggung jawab layanan administrasi persuratan, kepegawaian, keuangan, kesiswaan, dan rumah tangga sekolah secara menyeluruh.",
        en: "Person in charge of administrative services, correspondence, staffing, finance, student records, and school household support."
      },
      responsibilities: {
        id: [
          "Mengelola persuratan, kearsipan, dan administrasi kepegawaian sekolah.",
          "Menyusun draf administrasi keuangan sekolah dan laporan SPJ.",
          "Mendukung urusan sarana prasarana dan inventarisasi aset sekolah."
        ],
        en: [
          "Managing correspondence, archives, and school staffing administration.",
          "Drafting school financial administration and accountability reports.",
          "Supporting infrastructure affairs and school asset inventories."
        ]
      }
    }
  ]
};

interface StructureViewerProps {
  src: string;
  alt: string;
}

export function StructureViewer({ src, alt }: StructureViewerProps) {
  const [viewMode, setViewMode] = React.useState<"interactive" | "image">("interactive");
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [selectedNode, setSelectedNode] = React.useState<OrgNode>(ORG_DATA);
  const [selectedCoordinator, setSelectedCoordinator] = React.useState<CoordinatorNode | null>(null);
  const [collapsedNodes, setCollapsedNodes] = React.useState<Record<string, boolean>>({});

  const handleSelectNode = (node: OrgNode) => {
    setSelectedNode(node);
    setSelectedCoordinator(null);
  };

  // Drag-to-scroll functionality for desktop
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [startY, setStartY] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [scrollTop, setScrollTop] = React.useState(0);
  const dragStartPos = React.useRef({ x: 0, y: 0, hasMoved: false });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    if (e.button !== 0) return; // Only left click drags
    setIsDragging(true);
    const x = e.clientX;
    const y = e.clientY;
    dragStartPos.current = { x, y, hasMoved: false };
    setStartX(x);
    setStartY(y);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setScrollTop(scrollContainerRef.current.scrollTop);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    const dx = x - startX;
    const dy = y - startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragStartPos.current.hasMoved = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeft - dx;
    scrollContainerRef.current.scrollTop = scrollTop - dy;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Dynamic localization detection from path or window context
  const [locale, setLocale] = React.useState<"id" | "en">("id");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isEn = window.location.pathname.startsWith("/en");
      setLocale(isEn ? "en" : "id");
    }
  }, []);

  const toggleCollapse = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  // Render just the node card itself
  const renderCard = (node: OrgNode, showCollapseButton: boolean = false) => {
    const isSelected = selectedNode.id === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const isCollapsed = collapsedNodes[node.id];

    return (
      <div
        onClick={(e) => {
          if (dragStartPos.current.hasMoved) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          handleSelectNode(node);
        }}
        className={cn(
          "group/card relative cursor-pointer rounded-2xl p-4 w-48 text-center transition-all duration-300 active:scale-[0.98] border shadow-sm select-none shrink-0",
          isSelected
            ? "bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/20"
            : "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-emerald-500/50 hover:shadow-md"
        )}
      >
        <div className="flex flex-col items-center space-y-1.5">
          <span
            className={cn(
              "text-[9px] font-bold uppercase tracking-widest",
              isSelected ? "text-emerald-100" : "text-emerald-600 dark:text-emerald-400"
            )}
          >
            {node.role[locale]}
          </span>
          <h4 className="font-sfpro text-xs font-bold leading-tight line-clamp-2">
            {node.name}
          </h4>
          
          {/* Badge for coordinators */}
          {node.coordinators && node.coordinators.length > 0 && (
            <span className={cn(
              "mt-1.5 inline-block text-[8px] font-bold px-1.5 py-0.5 rounded-full border transition-colors duration-300",
              isSelected
                ? "bg-emerald-600/50 border-emerald-400/30 text-emerald-100"
                : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100/50 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400"
            )}>
              {node.coordinators.length} {locale === "id" ? "Koordinator" : "Coordinators"}
            </span>
          )}

          {/* Badge for special homeroom node */}
          {node.id === "wali-kelas" && (
            <span className={cn(
              "mt-1.5 inline-block text-[8px] font-bold px-1.5 py-0.5 rounded-full border transition-colors duration-300",
              isSelected
                ? "bg-emerald-600/50 border-emerald-400/30 text-emerald-100"
                : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100/50 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400"
            )}>
              18 {locale === "id" ? "Wali Kelas" : "Homerooms"}
            </span>
          )}
        </div>

        {/* Expand/Collapse Trigger */}
        {showCollapseButton && hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (dragStartPos.current.hasMoved) return;
              toggleCollapse(node.id, e);
            }}
            className={cn(
              "absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full size-6 flex items-center justify-center border transition-all duration-300 shadow-sm cursor-pointer z-10 active:scale-90",
              isSelected
                ? "bg-emerald-600 text-white border-emerald-400"
                : "bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700 hover:text-zinc-650"
            )}
          >
            {isCollapsed ? <ChevronRight className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>
        )}

        {/* Hover Tooltip for Coordinators */}
        {node.coordinators && node.coordinators.length > 0 && (
          <div className={cn(
            "absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-60 invisible opacity-0 translate-y-1 transition-all duration-200 pointer-events-none z-30",
            !isDragging && "group-hover/card:visible group-hover/card:opacity-100 group-hover/card:translate-y-0"
          )}>
            <div className="relative bg-zinc-900/95 dark:bg-zinc-950/95 backdrop-blur-sm border border-zinc-800 rounded-xl p-3.5 text-left shadow-xl shadow-black/40">
              <span className="block text-[8px] font-extrabold uppercase tracking-widest text-emerald-400 mb-2 border-b border-zinc-800 pb-1">
                {locale === "id" ? "Daftar Koordinator" : "Coordinators List"}
              </span>
              <ul className="space-y-1.5">
                {node.coordinators.map((coord, cIdx) => (
                  <li key={cIdx} className="leading-tight">
                    <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-wide">
                      {coord.role[locale]}
                    </span>
                    <span className="block text-[10px] font-bold text-white mt-0.5">
                      {coord.name}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Arrow pointer */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[5px] border-transparent border-t-zinc-900/95" />
            </div>
          </div>
        )}

        {/* Hover Tooltip for Wali Kelas */}
        {node.id === "wali-kelas" && (
          <div className={cn(
            "absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-[420px] invisible opacity-0 translate-y-1 transition-all duration-200 pointer-events-none z-30",
            !isDragging && "group-hover/card:visible group-hover/card:opacity-100 group-hover/card:translate-y-0"
          )}>
            <div className="relative bg-zinc-900/95 dark:bg-zinc-950/95 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 text-left shadow-xl shadow-black/40">
              <span className="block text-[8px] font-extrabold uppercase tracking-widest text-emerald-400 mb-3 border-b border-zinc-800 pb-1">
                {locale === "id" ? "Daftar Wali Kelas" : "Homeroom Teachers"}
              </span>
              <div className="grid grid-cols-3 gap-4 text-[9px]">
                {/* Kelas X */}
                <div className="space-y-1.5">
                  <span className="block text-[7px] font-extrabold text-emerald-500 uppercase tracking-widest border-b border-zinc-800/40 pb-0.5">Kelas X</span>
                  <ul className="space-y-1 font-mono">
                    <li><strong className="text-zinc-400">X-1:</strong> <span className="text-white font-sans font-semibold">Cut Sri M.</span></li>
                    <li><strong className="text-zinc-400">X-2:</strong> <span className="text-white font-sans font-semibold">Ferul D.</span></li>
                    <li><strong className="text-zinc-400">X-3:</strong> <span className="text-white font-sans font-semibold">Dzaki F.</span></li>
                    <li><strong className="text-zinc-400">X-4:</strong> <span className="text-white font-sans font-semibold">Misnawati</span></li>
                    <li><strong className="text-zinc-400">X-5:</strong> <span className="text-white font-sans font-semibold">Winda R.</span></li>
                    <li><strong className="text-zinc-400">X-6:</strong> <span className="text-white font-sans font-semibold">Armizani</span></li>
                  </ul>
                </div>
                
                {/* Kelas XI */}
                <div className="space-y-1.5">
                  <span className="block text-[7px] font-extrabold text-emerald-500 uppercase tracking-widest border-b border-zinc-800/40 pb-0.5">Kelas XI</span>
                  <ul className="space-y-1 font-mono">
                    <li><strong className="text-zinc-400">XI-1:</strong> <span className="text-white font-sans font-semibold">Irnalita</span></li>
                    <li><strong className="text-zinc-400">XI-2:</strong> <span className="text-white font-sans font-semibold">Eva S.</span></li>
                    <li><strong className="text-zinc-400">XI-3:</strong> <span className="text-white font-sans font-semibold">Roni M.</span></li>
                    <li><strong className="text-zinc-400">XI-4:</strong> <span className="text-white font-sans font-semibold">Mira F.</span></li>
                    <li><strong className="text-zinc-400">XI-5:</strong> <span className="text-white font-sans font-semibold">Rosita A.</span></li>
                    <li><strong className="text-zinc-400">XI-6:</strong> <span className="text-white font-sans font-semibold">Yassi H.</span></li>
                  </ul>
                </div>

                {/* Kelas XII */}
                <div className="space-y-1.5">
                  <span className="block text-[7px] font-extrabold text-emerald-500 uppercase tracking-widest border-b border-zinc-800/40 pb-0.5">Kelas XII</span>
                  <ul className="space-y-1 font-mono">
                    <li><strong className="text-zinc-400">XII-1:</strong> <span className="text-white font-sans font-semibold">Sumanti</span></li>
                    <li><strong className="text-zinc-400">XII-2:</strong> <span className="text-white font-sans font-semibold">Mutia R.</span></li>
                    <li><strong className="text-zinc-400">XII-3:</strong> <span className="text-white font-sans font-semibold">Fera D.</span></li>
                    <li><strong className="text-zinc-400">XII-4:</strong> <span className="text-white font-sans font-semibold">Michael T.</span></li>
                    <li><strong className="text-zinc-400">XII-5:</strong> <span className="text-white font-sans font-semibold">Raisul A.</span></li>
                    <li><strong className="text-zinc-400">XII-6:</strong> <span className="text-white font-sans font-semibold">Irma P.</span></li>
                  </ul>
                </div>
              </div>
              {/* Arrow pointer */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[5px] border-transparent border-t-zinc-900/95" />
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render a node card and recursively its children in the tree (Desktop view)
  const renderTreeNode = (node: OrgNode) => {
    const hasChildren = node.children && node.children.length > 0;
    const isCollapsed = collapsedNodes[node.id];

    return (
      <div key={node.id} className="flex flex-col items-center">
        {renderCard(node, true)}

        {/* Tree connection lines and children */}
        {hasChildren && !isCollapsed && (
          <div className="relative pt-8 flex flex-col items-center">
            {/* Vertical connector line from parent card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-zinc-200 dark:bg-zinc-700" />
            
            {/* Children grid */}
            <div className="relative flex gap-6">
              {node.children!.map((child, cIdx) => {
                const isFirst = cIdx === 0;
                const isLast = cIdx === node.children!.length - 1;
                return (
                  <div key={child.id} className="relative pt-6 flex flex-col items-center">
                    {/* Horizontal segment connecting to neighbors */}
                    {node.children!.length > 1 && (
                      <div 
                        className="absolute top-0 h-px bg-zinc-200 dark:bg-zinc-700"
                        style={{
                          left: isFirst ? "50%" : "0",
                          right: isLast ? "50%" : "0",
                        }}
                      />
                    )}
                    
                    {/* Vertical connector down to card */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
                    {renderTreeNode(child)}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the interactive tree with custom top-level side branches
  const renderInteractiveTree = (root: OrgNode) => {
    const committee = root.children?.find((c) => c.id === "committee");
    const cols = root.children?.filter((c) => c.id !== "committee") || [];

    return (
      <div className="flex flex-col items-center">
        {/* Top level: Principal centered with Committee positioned absolutely to the left */}
        <div className="relative flex flex-col items-center">
          {/* Principal Card */}
          {renderCard(root, false)}
          
          {/* Committee Card (absolutely positioned to the left) */}
          {committee && (
            <div className="absolute right-full top-0 mr-12 flex items-center">
              {renderCard(committee, false)}
              {/* Horizontal dotted connector line */}
              <div className="w-12 border-t-2 border-dashed border-zinc-350 dark:border-zinc-650" />
            </div>
          )}
        </div>

        {/* Vertical line down from Kepala Sekolah to the 7 columns */}
        <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-700" />

        {/* 7 Columns Row */}
        <div className="relative flex gap-6 justify-center">
          {cols.map((col, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === cols.length - 1;
            return (
              <div key={col.id} className="relative pt-6 flex flex-col items-center">
                {/* Horizontal connector line segment */}
                {cols.length > 1 && (
                  <div 
                    className="absolute top-0 h-px bg-zinc-200 dark:bg-zinc-700"
                    style={{
                      left: isFirst ? "50%" : "0",
                      right: isLast ? "50%" : "0",
                    }}
                  />
                )}
                {/* Vertical line segment down to card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
                {renderTreeNode(col)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render node item in the list view (Mobile/Accordion view)
  const renderListItem = (node: OrgNode, depth: number = 0) => {
    const isSelected = selectedNode.id === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const isCollapsed = collapsedNodes[node.id];

    return (
      <div key={node.id} className="space-y-2">
        <div
          onClick={() => handleSelectNode(node)}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          className={cn(
            "flex items-center justify-between rounded-xl py-3.5 pr-4 border cursor-pointer transition-all duration-200 active:scale-[0.99] select-none",
            isSelected
              ? "bg-emerald-500/10 dark:bg-emerald-500/5 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
              : "bg-white dark:bg-zinc-900 border-zinc-200/50 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Visual avatar indicator */}
            <div
              className={cn(
                "size-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 font-sfpro",
                isSelected
                  ? "bg-emerald-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
              )}
            >
              {node.initials}
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-[9px] font-bold uppercase tracking-widest text-[#16a34a] dark:text-emerald-400">
                {node.role[locale]}
              </span>
              <span className="font-sfpro text-xs font-semibold block truncate">
                {node.name}
              </span>
              {/* Mobile badges */}
              {node.coordinators && node.coordinators.length > 0 && (
                <span className="inline-block mt-0.5 text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {node.coordinators.length} {locale === "id" ? "Koordinator" : "Coordinators"}
                </span>
              )}
              {node.id === "wali-kelas" && (
                <span className="inline-block mt-0.5 text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  18 {locale === "id" ? "Wali Kelas" : "Homerooms"}
                </span>
              )}
            </div>
          </div>

          {hasChildren && (
            <button
              onClick={(e) => toggleCollapse(node.id, e)}
              className="rounded-full size-6 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-400 dark:text-zinc-500 hover:text-zinc-650 cursor-pointer active:scale-90"
            >
              {isCollapsed ? <ChevronRight className="size-3" /> : <ChevronDown className="size-3" />}
            </button>
          )}
        </div>

        {hasChildren && !isCollapsed && (
          <div className="pl-4 border-l border-dashed border-zinc-200 dark:border-zinc-800 space-y-2.5 pt-1.5 pb-1">
            {node.children!.map((child) => renderListItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Switcher & Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-5">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-sfpro text-sm font-bold uppercase tracking-widest text-zinc-550 dark:text-zinc-400">
            {locale === "id" ? "Bagan Organigram" : "Organogram Chart"}
          </h3>
        </div>

        {/* Segmented controls */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-full border border-zinc-200/30 w-fit">
          <button
            onClick={() => setViewMode("interactive")}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer",
              viewMode === "interactive"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
            )}
          >
            {locale === "id" ? "Bagan Interaktif" : "Interactive Chart"}
          </button>
          <button
            onClick={() => setViewMode("image")}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer",
              viewMode === "image"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
            )}
          >
            {locale === "id" ? "Gambar Cetak" : "Static Image"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "interactive" ? (
          <motion.div
            key="interactive"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="space-y-8"
          >
            {/* Tree Workspace container */}
            <div className="w-full border border-zinc-200/50 dark:border-zinc-800/60 rounded-3xl p-6 bg-zinc-50/50 dark:bg-zinc-950/20">
              
              {/* Desktop view (Tree diagram with horizontal & vertical drag-to-scroll) */}
              <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className={cn(
                  "hidden lg:block overflow-auto custom-scrollbar pb-8 pt-4 select-none",
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                )}
              >
                <div className="w-fit mx-auto p-4">
                  {renderInteractiveTree(ORG_DATA)}
                </div>
              </div>

              {/* Mobile/Tablet View (Vertical indented list) */}
              <div className="lg:hidden space-y-2.5">
                {renderListItem(ORG_DATA)}
              </div>
            </div>

            {/* Selected Card Details Panel (Genshin-style glass card) */}
            <div className="rounded-[2rem] bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 p-1 border border-emerald-500/10 shadow-sm">
              <div className="rounded-[calc(2rem-0.25rem)] bg-white dark:bg-zinc-900/80 backdrop-blur-md p-6 sm:p-8 space-y-6">
                
                {(() => {
                  const hasSelectedCoordinator = selectedCoordinator !== null;
                  const activeDetailNode = selectedCoordinator || selectedNode;

                  return (
                    <>
                      {/* Header card info */}
                      <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-5">
                        <div className="flex items-center gap-4">
                          {/* Avatar initials badge */}
                          <div className="size-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl font-sfpro shadow-md shadow-emerald-500/10">
                            {activeDetailNode.initials}
                          </div>
                          <div>
                            {hasSelectedCoordinator ? (
                              <button
                                onClick={() => setSelectedCoordinator(null)}
                                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors mb-1 cursor-pointer"
                              >
                                <ChevronLeft className="size-3.5" />
                                <span>{locale === "id" ? "Kembali ke " : "Back to "}{selectedNode.role[locale]}</span>
                              </button>
                            ) : (
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#16a34a]">
                                {selectedNode.role[locale]}
                              </span>
                            )}
                            <h3 className="font-sfpro text-lg sm:text-xl font-bold text-zinc-900 dark:text-white leading-tight mt-1">
                              {activeDetailNode.name}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                          <Info className="size-4 text-emerald-600 dark:text-emerald-500" />
                          <span>{locale === "id" ? "Info Detail Jabatan" : "Position Details"}</span>
                        </div>
                      </div>

                      {/* Body details */}
                      {selectedNode.id === "wali-kelas" ? (
                        <div className="space-y-6">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            {locale === "id" ? "Daftar Wali Kelas TA 2025/2026" : "List of Homeroom Teachers AY 2025/2026"}
                          </h4>
                          <div className="grid gap-6 sm:grid-cols-3">
                            {/* Kelas X */}
                            <div className="space-y-3">
                              <span className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-100/50 dark:border-emerald-900/30">
                                {locale === "id" ? "Kelas X" : "Grade X"}
                              </span>
                              <ul className="space-y-2.5 text-xs sm:text-sm">
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">X-1</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Cut Sri Marlinda, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">X-2</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Ferul Dani, S.Pd., Gr.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">X-3</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Dzaki Fuady, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">X-4</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Misnawati, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">X-5</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Winda Rahman, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">X-6</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Armizani, S.Pd.</span>
                                </li>
                              </ul>
                            </div>
                            
                            {/* Kelas XI */}
                            <div className="space-y-3">
                              <span className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-100/50 dark:border-emerald-900/30">
                                {locale === "id" ? "Kelas XI" : "Grade XI"}
                              </span>
                              <ul className="space-y-2.5 text-xs sm:text-sm">
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XI-1</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Irnalita, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XI-2</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Eva Susanti, S.Ag., M.M.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XI-3</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Roni Miranda, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XI-4</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Mira Fitriana, S.Si., M.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XI-5</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Rosita Ariani, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XI-6</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Yassi Hernawati, S.Pd.</span>
                                </li>
                              </ul>
                            </div>
                            
                            {/* Kelas XII */}
                            <div className="space-y-3">
                              <span className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-100/50 dark:border-emerald-900/30">
                                {locale === "id" ? "Kelas XII" : "Grade XII"}
                              </span>
                              <ul className="space-y-2.5 text-xs sm:text-sm">
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XII-1</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Sumanti Hutajulu, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XII-2</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Mutia Rahmah, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XII-3</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Fera Dama Yanti, S.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XII-4</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Michael Tianame, S.Pd., M.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XII-5</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Raisul Akbar, S.Pd., M.Pd.</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0 w-12 text-center">XII-6</span>
                                  <span className="text-zinc-750 dark:text-zinc-300 font-medium">Irma Putriyani, S.Pd.</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                {locale === "id" ? "Deskripsi Peran" : "Role Description"}
                              </h4>
                              <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans text-justify">
                                {activeDetailNode.desc[locale]}
                              </p>
                            </div>

                            <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                {locale === "id" ? "Tugas & Wewenang Utama" : "Key Responsibilities"}
                              </h4>
                              <ul className="space-y-2.5">
                                {activeDetailNode.responsibilities[locale].map((resp, rIdx) => (
                                  <li key={rIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
                                    <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-500 mt-0.5 shrink-0" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Coordinators Grid */}
                          {!hasSelectedCoordinator && selectedNode.coordinators && selectedNode.coordinators.length > 0 && (
                            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 space-y-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                                <Users className="size-4 text-emerald-600 dark:text-emerald-500" />
                                <span>
                                  {locale === "id" 
                                    ? "Koordinator & Penanggung Jawab Pelaksana" 
                                    : "Coordinators & Person in Charge"}
                                </span>
                              </h4>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {selectedNode.coordinators.map((coord, cIdx) => (
                                  <div 
                                    key={cIdx} 
                                    onClick={() => setSelectedCoordinator(coord)}
                                    className="flex items-center gap-3 rounded-xl p-3 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200/40 dark:border-zinc-800/40 cursor-pointer hover:border-emerald-500/40 hover:bg-emerald-500/[0.02] hover:shadow-sm transition-all duration-300 active:scale-[0.99]"
                                  >
                                    <div className="size-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100/50 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                                      {cIdx + 1}
                                    </div>
                                    <div className="min-w-0">
                                      <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                        {coord.role[locale]}
                                      </span>
                                      <span className="block font-sfpro text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                                        {coord.name}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                })()}

              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="image"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="w-full flex justify-center"
          >
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="group relative aspect-[4/3] w-full max-w-4xl bg-zinc-50 dark:bg-zinc-950/20 hover:scale-[1.005] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-zoom-in border border-zinc-200/50 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-inner"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-4"
                priority
              />
              
              {/* Hover overlay with scan icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white rounded-full px-5 py-3 shadow-md flex items-center gap-2">
                  <Maximize2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">{locale === "id" ? "Perbesar Gambar" : "Zoom Image"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      {isLightboxOpen && (
        <ImageLightbox
          images={[{ src, alt }]}
          initialIndex={0}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
}
