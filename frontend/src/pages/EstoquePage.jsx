import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEstoque } from '../storeConfig/slices/estoqueSlice';
import { useUserData } from '../hooks/useUserData';
import EstoqueList from '../components/estoque/EstoqueList';
import './styles/EstoquePage.css';
import PageHeader from '../components/PageHeader';
import Footer from "../components/Footer";


const EstoquePage = () => {
  const dispatch = useDispatch();
  const { validateUser } = useUserData();

  useEffect(() => {
    try {
      const userId = validateUser();
      dispatch(fetchEstoque(userId));
    } catch (error) {
      console.error("Erro de autenticação:", error);
    }
  }, [dispatch, validateUser]);

  return (
    <>
      <PageHeader showBackButton={true} />
      <div className="estoque-container">
        <EstoqueList />
        
      </div>
      <Footer />

    </>
  );
};

export default EstoquePage;