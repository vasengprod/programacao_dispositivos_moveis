import { useEffect, useState } from "react";

import {
  buscarCurriculo,
  CurriculoResponse,
} from "../services/curriculoApi";

export function useCurriculo() {
  const [curriculo, setCurriculo] = useState<CurriculoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarCurriculo() {
      try {
        const data = await buscarCurriculo();
        setCurriculo(data);
      } catch (error) {
        setErro("Não foi possível carregar os dados do currículo.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    carregarCurriculo();
  }, []);

  return {
    curriculo,
    loading,
    erro,
  };
}