import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          navbar: {
            home: "Home",
            cart: "Cart",
            all_products: "All Products",
            logout: "Log Out",
            signup: "Sign Up",
            login: "Login",
          },
          homepage: {
            title: "Explore Our Categories",
            subtitle: "Discover the latest trends in eco-friendly fashion",
            categories: {
              jeans: "Jeans",
              "t-shirts": "T-shirts",
              shoes: "Shoes",
              glasses: "Glasses",
              jackets: "Jackets",
              suits: "Suits",
              bags: "Bags",
              explore: "Explore {{category}}",
            },
          },
          cart: {
            empty_title: "Your cart is empty",
            empty_subtitle:
              "Looks like you haven't added anything to your cart yet.",
            start_shopping: "Start Shopping",
            remove: "Remove",
          },
          category: {
            default: "Category",
            sort_by: "Sort by:",
            sort: {
              none: "None",
              price: "Price",
              name: "Name",
            },
            search_placeholder: "Search by name",
            price_range: "Price: {{min}} VNĐ - {{max}} VNĐ",
            no_products: "No products found",
          },
          all_products: {
            title: "All Products",
            sort_by: "Sort by:",
            sort: {
              none: "None",
              price: "Price",
              name: "Name",
            },
            search_placeholder: "Search by name",
            no_products: "No products found",
          },
          product_card: {
            login_error: "Please login to add products to cart",
            add_to_cart: "Add to cart",
            image_alt: "product image",
          },
          featured_products: {
            title: "Featured",
            add_to_cart: "Add to Cart",
          },
          cart_item: {
            choose_quantity: "Choose quantity:",
            remove: "Remove",
          },
          order_summary: {
            title: "Order summary",
            original_price: "Original price",
            savings: "Savings",
            coupon: "Coupon ({{code}})",
            total: "Total",
            proceed_to_checkout: "Proceed to Checkout",
            or: "or",
            continue_shopping: "Continue Shopping",
          },
          login_page: {
            title: "Login to your account",
            email_label: "Email address",
            email_placeholder: "you@example.com",
            password_label: "Password",
            password_placeholder: "••••••••",
            login_button: "Login",
            loading: "Loading...",
            not_member: "Not a member?",
            signup_link: "Sign up now",
          },
          signup_page: {
            title: "Create your account",
            name_label: "Full name",
            name_placeholder: "John Doe",
            email_label: "Email address",
            email_placeholder: "you@example.com",
            password_label: "Password",
            password_placeholder: "••••••••",
            confirm_password_label: "Confirm Password",
            confirm_password_placeholder: "••••••••",
            signup_button: "Sign up",
            loading: "Loading...",
            already_have_account: "Already have an account?",
            login_link: "Login here",
          },
          products: {},
        },
      },
      vi: {
        translation: {
          navbar: {
            home: "Trang chủ",
            cart: "Giỏ hàng",
            all_products: "Tất cả sản phẩm",
            logout: "Đăng xuất",
            signup: "Đăng ký",
            login: "Đăng nhập",
          },
          homepage: {
            title: "Khám phá bộ sưu tập của chúng tôi",
            subtitle: "Cập nhật xu hướng thời trang xanh mới nhất",
            categories: {
              jeans: "Quần jeans",
              "t-shirts": "Áo thun",
              shoes: "Giày",
              glasses: "Kính",
              jackets: "Áo khoác",
              suits: "Bộ vest",
              bags: "Túi xách",
              explore: "Khám phá {{category}}",
            },
          },
          cart: {
            empty_title: "Giỏ hàng của bạn đang trống",
            empty_subtitle: "Có vẻ như bạn chưa thêm gì vào giỏ hàng.",
            start_shopping: "Bắt đầu mua sắm",
            remove: "Xóa",
          },
          category: {
            default: "Danh mục",
            sort_by: "Sắp xếp theo:",
            sort: {
              none: "Không sắp xếp",
              price: "Giá",
              name: "Tên",
            },
            search_placeholder: "Tìm kiếm theo tên",
            price_range: "Giá: {{min}} VNĐ - {{max}} VNĐ",
            no_products: "Không tìm thấy sản phẩm",
          },
          all_products: {
            title: "Tất cả sản phẩm",
            sort_by: "Sắp xếp theo:",
            sort: {
              none: "Không sắp xếp",
              price: "Giá",
              name: "Tên",
            },
            search_placeholder: "Tìm kiếm theo tên",
            no_products: "Không tìm thấy sản phẩm",
          },
          product_card: {
            login_error: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
            add_to_cart: "Thêm vào giỏ hàng",
            image_alt: "hình ảnh sản phẩm",
          },
          featured_products: {
            title: "Nổi bật",
            add_to_cart: "Thêm vào giỏ hàng",
          },
          cart_item: {
            choose_quantity: "Chọn số lượng:",
            remove: "Xóa",
          },
          order_summary: {
            title: "Đơn hàng",
            original_price: "Giá gốc",
            savings: "Tiết kiệm",
            coupon: "Mã giảm giá ({{code}})",
            total: "Tổng cộng",
            proceed_to_checkout: "Tiến hành thanh toán",
            or: "hoặc",
            continue_shopping: "Tiếp tục mua sắm",
          },
          login_page: {
            title: "Đăng nhập vào tài khoản của bạn",
            email_label: "Địa chỉ email",
            email_placeholder: "you@example.com",
            password_label: "Mật khẩu",
            password_placeholder: "••••••••",
            login_button: "Đăng nhập",
            loading: "Đang tải...",
            not_member: "Chưa phải thành viên?",
            signup_link: "Đăng ký ngay",
          },
          signup_page: {
            title: "Tạo tài khoản của bạn",
            name_label: "Họ và tên",
            name_placeholder: "Nguyễn Văn A",
            email_label: "Địa chỉ email",
            email_placeholder: "you@example.com",
            password_label: "Mật khẩu",
            password_placeholder: "••••••••",
            confirm_password_label: "Xác nhận mật khẩu",
            confirm_password_placeholder: "••••••••",
            signup_button: "Đăng ký",
            loading: "Đang tải...",
            already_have_account: "Đã có tài khoản?",
            login_link: "Đăng nhập tại đây",
          },
        },
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
