-- Tabela de pegada de carbono
CREATE TABLE IF NOT EXISTS carbon_footprint (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year INTEGER NOT NULL CHECK (year >= 2020),
    transport_emissions DECIMAL(10,2) DEFAULT 0,
    energy_emissions DECIMAL(10,2) DEFAULT 0,
    food_emissions DECIMAL(10,2) DEFAULT 0,
    shopping_emissions DECIMAL(10,2) DEFAULT 0,
    total_emissions DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, month, year)
);

-- Tabela de orçamentos verdes
CREATE TABLE IF NOT EXISTS green_budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    budget_amount DECIMAL(10,2) NOT NULL CHECK (budget_amount > 0),
    spent_amount DECIMAL(10,2) DEFAULT 0,
    carbon_limit DECIMAL(10,2) DEFAULT 0,
    carbon_used DECIMAL(10,2) DEFAULT 0,
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year INTEGER NOT NULL CHECK (year >= 2020),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de investimentos ESG
CREATE TABLE IF NOT EXISTS esg_investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    current_value DECIMAL(12,2) NOT NULL CHECK (current_value >= 0),
    esg_score DECIMAL(4,1) CHECK (esg_score >= 0 AND esg_score <= 100),
    environmental_score DECIMAL(4,1) CHECK (environmental_score >= 0 AND environmental_score <= 100),
    social_score DECIMAL(4,1) CHECK (social_score >= 0 AND social_score <= 100),
    governance_score DECIMAL(4,1) CHECK (governance_score >= 0 AND governance_score <= 100),
    category VARCHAR(100) NOT NULL,
    purchase_date TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de pontos verdes
CREATE TABLE IF NOT EXISTS green_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    points INTEGER NOT NULL,
    source VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de badges verdes
CREATE TABLE IF NOT EXISTS green_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    requirement TEXT NOT NULL,
    points INTEGER NOT NULL CHECK (points > 0),
    rarity VARCHAR(20) DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de badges do usuário
CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    badge_id UUID NOT NULL REFERENCES green_badges(id),
    earned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- Tabela de desafios de sustentabilidade
CREATE TABLE IF NOT EXISTS sustainability_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    target_value DECIMAL(10,2) NOT NULL CHECK (target_value > 0),
    unit VARCHAR(50) NOT NULL,
    points INTEGER NOT NULL CHECK (points > 0),
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    CHECK (end_date > start_date)
);

-- Tabela de desafios do usuário
CREATE TABLE IF NOT EXISTS user_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    challenge_id UUID NOT NULL REFERENCES sustainability_challenges(id),
    current_progress DECIMAL(10,2) DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    joined_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP NULL,
    UNIQUE(user_id, challenge_id)
);

-- Tabela de produtos usados (marketplace)
CREATE TABLE IF NOT EXISTS used_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    condition VARCHAR(50) NOT NULL CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
    images TEXT[], -- Array de URLs das imagens
    carbon_saved DECIMAL(8,2) DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de transações do marketplace
CREATE TABLE IF NOT EXISTS marketplace_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL,
    seller_id UUID NOT NULL,
    product_id UUID NOT NULL REFERENCES used_products(id),
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    carbon_saved DECIMAL(8,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP NULL
);

-- Tabela de doações ambientais
CREATE TABLE IF NOT EXISTS environmental_donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    cause VARCHAR(100) NOT NULL,
    carbon_offset DECIMAL(8,2) DEFAULT 0,
    donation_date TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de educação ambiental
CREATE TABLE IF NOT EXISTS environmental_education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    estimated_time INTEGER NOT NULL CHECK (estimated_time > 0), -- em minutos
    points INTEGER NOT NULL CHECK (points > 0),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de progresso educacional do usuário
CREATE TABLE IF NOT EXISTS user_education_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    education_id UUID NOT NULL REFERENCES environmental_education(id),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    is_completed BOOLEAN DEFAULT false,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP NULL,
    UNIQUE(user_id, education_id)
);

-- Tabela de certificados de sustentabilidade
CREATE TABLE IF NOT EXISTS sustainability_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    level VARCHAR(20) DEFAULT 'bronze' CHECK (level IN ('bronze', 'silver', 'gold', 'platinum')),
    requirements TEXT[] NOT NULL,
    issued_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NULL
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_carbon_footprint_user_date ON carbon_footprint(user_id, year, month);
CREATE INDEX IF NOT EXISTS idx_green_budgets_user_active ON green_budgets(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_esg_investments_user ON esg_investments(user_id);
CREATE INDEX IF NOT EXISTS idx_green_points_user ON green_points(user_id);
CREATE INDEX IF NOT EXISTS idx_green_points_created ON green_points(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_sustainability_challenges_active ON sustainability_challenges(is_active, end_date);
CREATE INDEX IF NOT EXISTS idx_user_challenges_user ON user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_used_products_available ON used_products(is_available, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_buyer ON marketplace_transactions(buyer_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_seller ON marketplace_transactions(seller_id);
CREATE INDEX IF NOT EXISTS idx_environmental_donations_user ON environmental_donations(user_id);
CREATE INDEX IF NOT EXISTS idx_environmental_education_active ON environmental_education(is_active);
CREATE INDEX IF NOT EXISTS idx_user_education_progress_user ON user_education_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_sustainability_certificates_user ON sustainability_certificates(user_id);

-- Triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_carbon_footprint_updated_at BEFORE UPDATE ON carbon_footprint FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_green_budgets_updated_at BEFORE UPDATE ON green_budgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_esg_investments_updated_at BEFORE UPDATE ON esg_investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_used_products_updated_at BEFORE UPDATE ON used_products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_environmental_education_updated_at BEFORE UPDATE ON environmental_education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
