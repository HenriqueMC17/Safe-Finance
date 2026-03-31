-- Inserir badges padrão
INSERT INTO green_badges (name, description, icon, category, requirement, points, rarity) VALUES
('Primeiro Passo Verde', 'Complete seu primeiro desafio de sustentabilidade', 'leaf', 'achievement', 'Completar 1 desafio', 50, 'common'),
('Iniciante Sustentável', 'Calcule sua primeira pegada de carbono', 'target', 'carbon', 'Calcular pegada de carbono', 25, 'common'),
('Redutor de Carbono', 'Reduza sua pegada de carbono em 25% em um mês', 'trending-down', 'carbon', 'Reduzir 25% das emissões', 200, 'rare'),
('Mestre da Eficiência', 'Reduza seu consumo de energia em 50%', 'zap', 'carbon', 'Reduzir 50% energia', 250, 'epic'),
('Investidor Verde', 'Faça seu primeiro investimento ESG', 'trending-up', 'investment', 'Fazer 1 investimento ESG', 150, 'rare'),
('Investidor Sustentável', 'Tenha R$ 10.000 em investimentos ESG', 'gem', 'investment', 'R$ 10.000 em ESG', 400, 'legendary'),
('Educador Ambiental', 'Complete 3 cursos sobre sustentabilidade', 'book-open', 'education', 'Completar 3 cursos', 180, 'epic'),
('Especialista Verde', 'Complete 10 cursos de educação ambiental', 'star', 'education', 'Completar 10 cursos', 500, 'legendary'),
('Líder Comunitário', 'Inspire 5 pessoas a participarem de desafios', 'crown', 'community', 'Inspirar 5 pessoas', 350, 'epic'),
('Guardião da Natureza', 'Mantenha uma sequência de 10 desafios completados', 'shield', 'achievement', 'Sequência de 10 desafios', 300, 'epic'),
('Campeão da Sustentabilidade', 'Fique no top 10 do ranking por 3 meses consecutivos', 'trophy', 'achievement', 'Top 10 por 3 meses', 1000, 'legendary'),
('Doador Verde', 'Faça sua primeira doação para causa ambiental', 'heart', 'community', 'Fazer 1 doação ambiental', 100, 'common'),
('Filantropo Ambiental', 'Done mais de R$ 1.000 para causas ambientais', 'gift', 'community', 'Doar R$ 1.000+', 300, 'rare'),
('Comprador Consciente', 'Compre 10 produtos usados no marketplace', 'shopping-bag', 'community', 'Comprar 10 produtos usados', 150, 'rare'),
('Vendedor Sustentável', 'Venda 20 produtos no marketplace verde', 'store', 'community', 'Vender 20 produtos', 200, 'rare');

-- Inserir desafios de sustentabilidade
INSERT INTO sustainability_challenges (title, description, category, target_value, unit, points, difficulty, start_date, end_date) VALUES
('Semana sem Carro', 'Use apenas transporte público, bicicleta ou caminhada por 7 dias consecutivos', 'carbon_reduction', 7, 'dias', 200, 'medium', '2024-01-01', '2024-12-31'),
('Economia de Energia', 'Reduza seu consumo de energia elétrica em 20% comparado ao mês anterior', 'carbon_reduction', 20, '% redução', 150, 'medium', '2024-01-01', '2024-12-31'),
('Compras Sustentáveis', 'Gaste pelo menos R$ 300 em produtos ecológicos e sustentáveis', 'green_spending', 300, 'reais', 100, 'easy', '2024-01-01', '2024-12-31'),
('Mestre da Reciclagem', 'Recicle pelo menos 50 itens diferentes durante o mês', 'community', 50, 'itens', 120, 'easy', '2024-01-01', '2024-12-31'),
('Educação Verde', 'Complete 3 cursos sobre sustentabilidade e meio ambiente', 'education', 3, 'cursos', 180, 'hard', '2024-01-01', '2024-12-31'),
('Investidor ESG', 'Invista pelo menos R$ 1.000 em fundos ou ações ESG', 'green_spending', 1000, 'reais', 250, 'hard', '2024-01-01', '2024-12-31'),
('Doador Ambiental', 'Faça doações para organizações ambientais totalizando R$ 100', 'community', 100, 'reais', 150, 'medium', '2024-01-01', '2024-12-31'),
('Alimentação Consciente', 'Tenha pelo menos 20 refeições vegetarianas no mês', 'carbon_reduction', 20, 'refeições', 130, 'medium', '2024-01-01', '2024-12-31'),
('Marketplace Verde', 'Compre 5 produtos usados no marketplace sustentável', 'community', 5, 'produtos', 100, 'easy', '2024-01-01', '2024-12-31'),
('Influenciador Verde', 'Convide 3 amigos para participarem de desafios sustentáveis', 'community', 3, 'pessoas', 200, 'hard', '2024-01-01', '2024-12-31');

-- Inserir conteúdo educacional
INSERT INTO environmental_education (title, description, content, category, difficulty, estimated_time, points) VALUES
('Introdução à Sustentabilidade', 'Conceitos básicos sobre sustentabilidade e meio ambiente', 'Conteúdo sobre os pilares da sustentabilidade: ambiental, social e econômico. Aprenda sobre a importância de práticas sustentáveis no dia a dia.', 'sustainable_living', 'beginner', 30, 25),
('Mudanças Climáticas', 'Entenda as causas e consequências das mudanças climáticas', 'Curso abrangente sobre o aquecimento global, efeito estufa, e como nossas ações impactam o clima mundial.', 'climate_change', 'intermediate', 45, 50),
('Energia Renovável', 'Tipos de energia limpa e como implementá-las', 'Explore energia solar, eólica, hidrelétrica e outras fontes renováveis. Aprenda sobre eficiência energética.', 'renewable_energy', 'intermediate', 60, 50),
('Investimentos ESG', 'Como investir de forma sustentável e responsável', 'Guia completo sobre critérios ESG, fundos sustentáveis, e como avaliar investimentos verdes.', 'green_finance', 'advanced', 90, 100),
('Economia Circular', 'Princípios da economia circular e redução de resíduos', 'Aprenda sobre reutilização, reciclagem, e como criar um ciclo sustentável de consumo.', 'sustainable_living', 'intermediate', 50, 50),
('Pegada de Carbono', 'Como calcular e reduzir sua pegada de carbono pessoal', 'Métodos para medir suas emissões de CO₂ e estratégias práticas para reduzi-las.', 'climate_change', 'beginner', 40, 25),
('Agricultura Sustentável', 'Práticas agrícolas que preservam o meio ambiente', 'Conheça técnicas de agricultura orgânica, permacultura e produção sustentável de alimentos.', 'sustainable_living', 'advanced', 75, 100),
('Mobilidade Urbana Sustentável', 'Alternativas de transporte ecológico nas cidades', 'Explore opções como transporte público, bicicletas, carros elétricos e planejamento urbano verde.', 'sustainable_living', 'beginner', 35, 25),
('Finanças Verdes', 'Produtos financeiros sustentáveis e títulos verdes', 'Aprenda sobre green bonds, créditos de carbono, e outros instrumentos financeiros ambientais.', 'green_finance', 'advanced', 80, 100),
('Biodiversidade e Conservação', 'Importância da biodiversidade e como protegê-la', 'Estude ecossistemas, espécies ameaçadas, e ações de conservação ambiental.', 'climate_change', 'intermediate', 55, 50);

-- Inserir produtos usados de exemplo
INSERT INTO used_products (seller_id, title, description, category, price, condition, carbon_saved) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'iPhone 12 Pro 128GB', 'iPhone em excelente estado, com caixa e carregador original', 'Eletrônicos', 2500.00, 'excellent', 45.5),
('550e8400-e29b-41d4-a716-446655440001', 'Bicicleta Trek Mountain Bike', 'Bicicleta seminova, ideal para trilhas e cidade', 'Esportes', 800.00, 'good', 120.0),
('550e8400-e29b-41d4-a716-446655440002', 'Notebook Dell Inspiron 15', 'Notebook usado, funcionando perfeitamente, 8GB RAM, SSD 256GB', 'Eletrônicos', 1800.00, 'good', 85.2),
('550e8400-e29b-41d4-a716-446655440003', 'Sofá 3 lugares em couro', 'Sofá em bom estado, pequenos sinais de uso', 'Móveis', 1200.00, 'fair', 200.0),
('550e8400-e29b-41d4-a716-446655440004', 'Geladeira Brastemp Frost Free', 'Geladeira duplex, funcionando perfeitamente', 'Eletrodomésticos', 900.00, 'good', 150.0);

-- Inserir organizações para doações
INSERT INTO environmental_donations (user_id, organization_name, amount, cause, carbon_offset) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'SOS Mata Atlântica', 100.00, 'reforestation', 5.2),
('550e8400-e29b-41d4-a716-446655440001', 'Instituto Akatu', 50.00, 'education', 2.1),
('550e8400-e29b-41d4-a716-446655440002', 'Greenpeace Brasil', 200.00, 'ocean_cleanup', 8.7),
('550e8400-e29b-41d4-a716-446655440003', 'WWF Brasil', 150.00, 'wildlife_protection', 6.5),
('550e8400-e29b-41d4-a716-446655440004', 'Instituto Chico Mendes', 75.00, 'conservation', 3.8);

-- Inserir certificados de sustentabilidade
INSERT INTO sustainability_certificates (user_id, name, description, level, requirements) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Certificado Verde Iniciante', 'Reconhecimento por completar os primeiros passos na jornada sustentável', 'bronze', ARRAY['Completar 3 desafios', 'Calcular pegada de carbono', 'Fazer 1 investimento ESG']),
('550e8400-e29b-41d4-a716-446655440001', 'Certificado Eco Consciente', 'Certificação para usuários com práticas sustentáveis consolidadas', 'silver', ARRAY['Completar 10 desafios', 'Reduzir pegada de carbono em 25%', 'Completar 5 cursos educacionais']),
('550e8400-e29b-41d4-a716-446655440002', 'Certificado Guardião Verde', 'Reconhecimento para defensores ativos do meio ambiente', 'gold', ARRAY['Completar 25 desafios', 'Manter sequência de 15 desafios', 'Inspirar 10 pessoas']),
('550e8400-e29b-41d4-a716-446655440003', 'Certificado Mestre Sustentável', 'Máxima certificação em sustentabilidade', 'platinum', ARRAY['Completar 50 desafios', 'Top 10 ranking por 6 meses', 'Completar todos os cursos']);
