



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  
 const {fetchUser} = useAppContext()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};

    if (!email.includes("@")) {
      newErrors.email = "Invalid email format";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await axios
        .post("http://localhost:5003/api/users/login", { email, password },{
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          console.log(res.data.message);
          fetchUser();
          navigate("/");
          // navigate("/");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          console.error("Error", error);
        });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Login error:", error.response.data);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
        
    </div>
  )
}

export default LoginPage