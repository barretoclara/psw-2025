import EstoqueList from '../components/estoque/EstoqueList';
import { selectCurrentUserId } from '../storeConfig/slices/usuarioSlice';

const EstoquePage = () => {
  const userId = useSelector(selectCurrentUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchEstoque());
    }
  }, [userId, dispatch]);

  return (
  <div>
    <h1 className="text-xl font-bold mb-4">Estoque</h1>
    <EstoqueList />
  </div>
  );
}

export default EstoquePage;